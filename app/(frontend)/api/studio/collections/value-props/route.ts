import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioValueProps, saveStudioValueProps, type StudioValueProp } from "@/lib/studio/collections/value-props";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioValueProps());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const items = (json as { items?: StudioValueProp[] } | null)?.items;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Provide an items array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioValueProps(items));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
