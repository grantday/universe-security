import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioServices, saveStudioServices, type StudioService } from "@/lib/studio/collections/services";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioServices());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const items = (json as { items?: StudioService[] } | null)?.items;
  if (!Array.isArray(items) || items.length < 1) {
    return NextResponse.json({ error: "Provide a non-empty items array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioServices(items));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
