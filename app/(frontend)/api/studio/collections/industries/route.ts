import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioIndustries, saveStudioIndustries, type StudioIndustry } from "@/lib/studio/collections/industries";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioIndustries());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const items = (json as { items?: StudioIndustry[] } | null)?.items;
  if (!Array.isArray(items) || items.length < 1) {
    return NextResponse.json({ error: "Provide a non-empty items array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioIndustries(items));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
