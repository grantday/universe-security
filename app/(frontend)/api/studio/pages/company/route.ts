import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioCompanyPage, saveStudioCompanyPage, type StudioCompanyPage } from "@/lib/studio/company-page";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getStudioCompanyPage());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = (await request.json().catch(() => null) as { page?: StudioCompanyPage } | null)?.page;
  if (!page) return NextResponse.json({ error: "Provide page object" }, { status: 400 });
  try {
    return NextResponse.json(await saveStudioCompanyPage(page));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
