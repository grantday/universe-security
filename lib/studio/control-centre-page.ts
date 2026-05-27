import "server-only";

import type { ControlCentrePage } from "@/payload-types";
import { getPayloadGlobal, patchPayloadGlobal } from "@/lib/studio/patch-global";

export type StudioControlCentrePage = Pick<
  ControlCentrePage,
  "heroTitle" | "heroIntro" | "features" | "ctaLabel" | "ctaHref"
>;

export async function getStudioControlCentrePage() {
  const doc = await getPayloadGlobal("control-centre-page", 0);
  return {
    page: {
      heroTitle: doc.heroTitle,
      heroIntro: doc.heroIntro,
      features: doc.features ?? [],
      ctaLabel: doc.ctaLabel,
      ctaHref: doc.ctaHref,
    },
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function saveStudioControlCentrePage(page: StudioControlCentrePage) {
  if (!page.features?.length) throw new Error("At least one feature is required.");
  await patchPayloadGlobal("control-centre-page", page, ["/control-centre"]);
  return getStudioControlCentrePage();
}
