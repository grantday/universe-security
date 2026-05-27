import { del, head, put, list } from "@vercel/blob";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { applyContactFromConfig } from "@/lib/content/contact-from-config";
import { mergeContent } from "@/lib/content/merge";
import { normalizeSiteContent } from "@/lib/content/normalize";
import { siteContentSchema, type SiteContent } from "@/lib/content/schema";

const BLOB_PATH = "site-content.json";
const LOCAL_PATH = path.join(process.cwd(), "content", "site-content.json");

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await readFile(LOCAL_PATH, "utf8");
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  await writeFile(LOCAL_PATH, JSON.stringify(content, null, 2), "utf8");
}

async function readBlob(): Promise<SiteContent | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const meta = await head(BLOB_PATH).catch(() => null);
    if (meta?.url) {
      const res = await fetch(meta.url, { cache: "no-store" });
      if (res.ok) {
        return mergeContent((await res.json()) as Partial<SiteContent>);
      }
    }
    const { blobs } = await list({ prefix: "site-content", limit: 20 });
    const hit = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!hit?.url) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return mergeContent((await res.json()) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeBlob(content: SiteContent): Promise<void> {
  const existing = await head(BLOB_PATH).catch(() => null);
  if (existing?.url) {
    await del(existing.url).catch(() => undefined);
  }
  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

function withContactDefaults(content: SiteContent): SiteContent {
  return normalizeSiteContent(applyContactFromConfig(content));
}

export async function getSiteContent(): Promise<SiteContent> {
  const fromBlob = await readBlob();
  if (fromBlob) return withContactDefaults(fromBlob);
  const fromLocal = await readLocal();
  if (fromLocal) return withContactDefaults(fromLocal);
  return withContactDefaults(mergeContent({}));
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const normalized = normalizeSiteContent(content);
  const parsed = siteContentSchema.parse(normalized);

  if (process.env.VERCEL === "1" && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Vercel Blob is not connected. Open your Vercel project → Storage → Create Blob store → Redeploy.",
    );
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await writeBlob(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Blob write failed";
      throw new Error(`Could not save to Vercel Blob: ${message}`);
    }
    await writeLocal(parsed).catch(() => undefined);
    return parsed;
  }

  try {
    await writeLocal(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "File write failed";
    throw new Error(
      `Could not save locally. On Vercel, add Storage → Blob so content persists. (${message})`,
    );
  }
  return parsed;
}

export async function uploadAsset(file: File, folder: string): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Add a Blob store in Vercel (Storage → Blob) to upload images.");
  }
  const ext = file.name.split(".").pop() ?? "bin";
  const pathname = `assets/${folder.replace(/[^a-z0-9-]/gi, "") || "general"}/${Date.now()}.${ext}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "application/octet-stream",
  });
  return blob.url;
}
