import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioSolutionsPage, saveStudioSolutionsPage, type StudioSolutionsPage } from "@/lib/studio/solutions-page";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioSolutionsPage());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const page = (json as { page?: StudioSolutionsPage } | null)?.page;
  if (!page) {
    return NextResponse.json({ error: "Provide page object" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioSolutionsPage(page));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
