import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioTrustBadges, saveStudioTrustBadges, type StudioTrustBadge } from "@/lib/studio/trust-badges";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioTrustBadges());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const badges = (json as { badges?: StudioTrustBadge[] } | null)?.badges;
  if (!Array.isArray(badges) || badges.length < 1) {
    return NextResponse.json({ error: "Provide a non-empty badges array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioTrustBadges(badges));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
