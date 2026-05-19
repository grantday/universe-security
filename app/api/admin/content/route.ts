import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { prepareContentForSave } from "@/lib/content/normalize";
import { getSiteContent, saveSiteContent } from "@/lib/content/store";

const REVALIDATE_PATHS = [
  "/",
  "/solutions",
  "/industries",
  "/company",
  "/control-centre",
  "/technology",
  "/contact",
];

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let merged;
  try {
    merged = prepareContentForSave(json);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid content";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const saved = await saveSiteContent(merged);
    for (const p of REVALIDATE_PATHS) {
      revalidatePath(p, "layout");
    }
    return NextResponse.json(saved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
