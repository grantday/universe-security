import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import {
  getStudioIndustriesPage,
  saveStudioIndustriesPage,
  type StudioIndustriesPage,
} from "@/lib/studio/industries-page";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioIndustriesPage());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const page = (json as { page?: StudioIndustriesPage } | null)?.page;
  if (!page) {
    return NextResponse.json({ error: "Provide page object" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioIndustriesPage(page));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
