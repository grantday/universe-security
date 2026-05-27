import type { HeroSlide } from "@/lib/content/schema";

export type LayerRole = "prev" | "active" | "next";

export type AdjacentSlide = { slide: HeroSlide; role: LayerRole };

export function slideAt(slides: HeroSlide[], index: number): HeroSlide {
  return slides[(index + slides.length) % slides.length]!;
}

/** Build ordered layers for the stacked hero carousel (always returns an array). */
export function buildAdjacentLayers(slides: HeroSlide[], index: number): AdjacentSlide[] {
  if (!Array.isArray(slides) || slides.length === 0) return [];

  const len = slides.length;
  const safe = Number.isFinite(index) ? ((Math.floor(index) % len) + len) % len : 0;

  if (len === 1) {
    return [{ slide: slides[0]!, role: "active" }];
  }

  return [
    { slide: slides[(safe - 1 + len) % len]!, role: "prev" },
    { slide: slides[safe]!, role: "active" },
    { slide: slides[(safe + 1) % len]!, role: "next" },
  ];
}

/** @deprecated Use buildAdjacentLayers — normalizes legacy object-shaped returns. */
export function getAdjacentSlides(slides: HeroSlide[], index: number): AdjacentSlide[] {
  const layers = buildAdjacentLayers(slides, index);
  return layers;
}

/** Coerce hot-reload / legacy return values into an array before calling .map(). */
export function normalizeAdjacentLayers(value: unknown): AdjacentSlide[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const o = value as { prev?: HeroSlide; active?: HeroSlide; next?: HeroSlide };
    if (o.active) {
      const out: AdjacentSlide[] = [{ slide: o.active, role: "active" }];
      if (o.prev) out.unshift({ slide: o.prev, role: "prev" });
      if (o.next) out.push({ slide: o.next, role: "next" });
      return out;
    }
  }
  return [];
}

export const LAYER_STYLES: Record<
  LayerRole,
  { zIndex: number; scale: number; opacity: number; x: number; y: number; rotate: number }
> = {
  prev: { zIndex: 10, scale: 0.88, opacity: 0.4, x: -28, y: 24, rotate: -2 },
  active: { zIndex: 30, scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 },
  next: { zIndex: 20, scale: 0.94, opacity: 0.55, x: 32, y: 16, rotate: 2 },
};

export const AUTOPLAY_MS = 7500;
