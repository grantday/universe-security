import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content/store";
import { siteContentSchema } from "@/lib/content/schema";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid content", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const saved = await saveSiteContent(parsed.data);
    revalidatePath("/", "layout");
    return NextResponse.json(saved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
