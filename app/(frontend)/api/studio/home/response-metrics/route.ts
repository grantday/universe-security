import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import type { StudioMetric } from "@/lib/studio/collections/metrics";
import {
  getStudioResponseMetrics,
  saveStudioResponseMetrics,
  type StudioKpisSection,
} from "@/lib/studio/response-metrics";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioResponseMetrics());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const body = json as { kpisSection?: StudioKpisSection; items?: StudioMetric[] } | null;
  if (!body?.kpisSection || typeof body.kpisSection !== "object") {
    return NextResponse.json({ error: "Provide kpisSection object" }, { status: 400 });
  }
  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Provide an items array" }, { status: 400 });
  }
  try {
    return NextResponse.json(
      await saveStudioResponseMetrics({ kpisSection: body.kpisSection, items: body.items }),
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
