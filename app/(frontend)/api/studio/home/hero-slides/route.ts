import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/content/auth";
import { getStudioHeroSlides, saveStudioHeroSlides } from "@/lib/studio/hero-slides";
import type { StudioHeroSlide } from "@/lib/studio/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await getStudioHeroSlides();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load slides";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const slides = (json as { slides?: StudioHeroSlide[] } | null)?.slides;
  if (!Array.isArray(slides) || slides.length < 1) {
    return NextResponse.json({ error: "Provide a non-empty slides array" }, { status: 400 });
  }

  try {
    const data = await saveStudioHeroSlides(slides);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save slides";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
