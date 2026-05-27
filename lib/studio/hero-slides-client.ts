import type { StudioHeroSlide } from "@/lib/studio/types";

export function createEmptySlide(index: number): StudioHeroSlide {
  const n = index + 1;
  return {
    id: `slide-${n}`,
    eyebrow: "New slide",
    title: "Headline",
    body: "Short description for this slide.",
    theme: "guards",
    seed: `slide-${n}`,
    imageUrl: "",
    imageId: null,
    ctaPrimary: { href: "/contact", label: "Contact us" },
    ctaSecondary: { href: "/solutions", label: "Solutions" },
  };
}
