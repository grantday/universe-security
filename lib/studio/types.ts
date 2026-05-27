import type { HeroSlide } from "@/lib/content/schema";

/** Hero slide as edited in Studio (includes Payload media id when set). */
export type StudioHeroSlide = HeroSlide & {
  imageId: number | null;
};

export type StudioHeroSlidesPayload = {
  slides: StudioHeroSlide[];
  updatedAt: string | null;
};
