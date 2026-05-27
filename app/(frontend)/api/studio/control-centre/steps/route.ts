import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import {
  getStudioControlCentreSteps,
  saveStudioControlCentreSteps,
  type StudioFlowStep,
} from "@/lib/studio/control-centre-steps";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getStudioControlCentreSteps());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const steps = (await request.json().catch(() => null) as { steps?: StudioFlowStep[] } | null)?.steps;
  if (!Array.isArray(steps) || steps.length < 1) {
    return NextResponse.json({ error: "Provide a non-empty steps array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioControlCentreSteps(steps));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
