import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioContactPage, saveStudioContactPage, type StudioContactPage } from "@/lib/studio/contact-page";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getStudioContactPage());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = (await request.json().catch(() => null) as { page?: StudioContactPage } | null)?.page;
  if (!page) return NextResponse.json({ error: "Provide page object" }, { status: 400 });
  try {
    return NextResponse.json(await saveStudioContactPage(page));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
