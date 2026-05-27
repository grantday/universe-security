import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioTestimonials, saveStudioTestimonials, type StudioTestimonial } from "@/lib/studio/collections/testimonials";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getStudioTestimonials());
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Load failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await request.json().catch(() => null);
  const items = (json as { items?: StudioTestimonial[] } | null)?.items;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Provide an items array" }, { status: 400 });
  }
  try {
    return NextResponse.json(await saveStudioTestimonials(items));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Save failed" }, { status: 500 });
  }
}
