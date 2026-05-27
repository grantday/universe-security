import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioHomeSections, saveStudioHomeSections, type StudioHomeSections } from "@/lib/studio/home-sections";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioHomeSections());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const sections = (json as { sections?: StudioHomeSections } | null)?.sections;
  if (!sections || typeof sections !== "object") {
    return NextResponse.json({ error: "Provide sections object" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioHomeSections(sections));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
