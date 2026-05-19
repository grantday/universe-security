import { put, list } from "@vercel/blob";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultSiteContent } from "@/lib/content/defaults";
import { siteContentSchema, type SiteContent } from "@/lib/content/schema";

const BLOB_PATH = "site-content.json";
const LOCAL_PATH = path.join(process.cwd(), "content", "site-content.json");

function merge(partial: Partial<SiteContent>): SiteContent {
  return siteContentSchema.parse({
    ...defaultSiteContent,
    ...partial,
    site: { ...defaultSiteContent.site, ...partial.site },
    branding: { ...defaultSiteContent.branding, ...partial.branding },
    heroSlides: partial.heroSlides ?? defaultSiteContent.heroSlides,
    services: partial.services ?? defaultSiteContent.services,
    testimonials: partial.testimonials ?? defaultSiteContent.testimonials,
    kpis: partial.kpis ?? defaultSiteContent.kpis,
  });
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const raw = await readFile(LOCAL_PATH, "utf8");
    return merge(JSON.parse(raw) as Partial<SiteContent>);
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
    const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
    const hit = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!hit?.url) return null;
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    return merge((await res.json()) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  const fromBlob = await readBlob();
  if (fromBlob) return fromBlob;
  const fromLocal = await readLocal();
  if (fromLocal) return fromLocal;
  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const parsed = siteContentSchema.parse(content);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlob(parsed);
    await writeLocal(parsed).catch(() => undefined);
    return parsed;
  }
  await writeLocal(parsed);
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
