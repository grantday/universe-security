import "server-only";

import { imageUrl } from "@/lib/image";
import type { HomePage } from "@/payload-types";
import type { StudioHeroSlide } from "@/lib/studio/types";
import { getHomePageGlobal, patchHomePageGlobal } from "@/lib/studio/home-page";

function mapSlide(slide: NonNullable<HomePage["heroSlides"]>[number]): StudioHeroSlide {
  let imageId: number | null = null;
  let imageUrlStr = "";
  const explicitUrl = (slide as { imageUrl?: string | null }).imageUrl?.trim() ?? "";
  if (typeof slide.image === "object" && slide.image) {
    imageId = slide.image.id;
    imageUrlStr = imageUrl(slide.image, "hero");
  } else if (typeof slide.image === "number") {
    imageId = slide.image;
  }
  if (explicitUrl) imageUrlStr = explicitUrl;
  return {
    id: slide.id,
    eyebrow: slide.eyebrow,
    title: slide.title,
    body: slide.body,
    theme: slide.theme,
    seed: slide.seed,
    imageUrl: explicitUrl || imageUrlStr,
    imageId,
    ctaPrimary: slide.ctaPrimary,
    ctaSecondary: slide.ctaSecondary,
  };
}

export async function getStudioHeroSlides() {
  const home = await getHomePageGlobal(2);
  return {
    slides: (home.heroSlides ?? []).map(mapSlide),
    updatedAt: home.updatedAt ?? null,
  };
}

export async function saveStudioHeroSlides(slides: StudioHeroSlide[]) {
  if (slides.length < 1) {
    throw new Error("At least one hero slide is required.");
  }

  const heroSlides = slides.map((slide) => ({
    id: slide.id,
    eyebrow: slide.eyebrow,
    title: slide.title,
    body: slide.body,
    theme: slide.theme,
    seed: slide.seed,
    image: slide.imageId ?? undefined,
    imageUrl: slide.imageUrl?.trim() || undefined,
    ctaPrimary: slide.ctaPrimary,
    ctaSecondary: slide.ctaSecondary,
  }));

  await patchHomePageGlobal({ heroSlides });
  return getStudioHeroSlides();
}
