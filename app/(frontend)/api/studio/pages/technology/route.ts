import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioTechnologyPage, saveStudioTechnologyPage, type StudioTechnologyPage } from "@/lib/studio/technology-page";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getStudioTechnologyPage());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = (await request.json().catch(() => null) as { page?: StudioTechnologyPage } | null)?.page;
  if (!page) return NextResponse.json({ error: "Provide page object" }, { status: 400 });
  try {
    return NextResponse.json(await saveStudioTechnologyPage(page));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
