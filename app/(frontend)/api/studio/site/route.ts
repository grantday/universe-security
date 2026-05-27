import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioSiteSettings, saveStudioSiteSettings, type StudioSiteSettings } from "@/lib/studio/site-settings";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioSiteSettings());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const settings = (json as { settings?: StudioSiteSettings } | null)?.settings;
  if (!settings) {
    return NextResponse.json({ error: "Provide settings object" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioSiteSettings(settings));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
