import "server-only";

import type { HomePage } from "@/payload-types";
import { getHomePageGlobal, patchHomePageGlobal } from "@/lib/studio/home-page";

export type StudioHomeSections = Pick<
  HomePage,
  "coreServices" | "controlCentrePreview" | "whyChoose" | "kpisSection" | "testimonialsSection" | "contactCta"
>;

export async function getStudioHomeSections() {
  const home = await getHomePageGlobal(0);
  return {
    sections: {
      coreServices: home.coreServices,
      controlCentrePreview: home.controlCentrePreview,
      whyChoose: home.whyChoose,
      kpisSection: home.kpisSection,
      testimonialsSection: home.testimonialsSection,
      contactCta: home.contactCta,
    },
    updatedAt: home.updatedAt ?? null,
  };
}

export async function saveStudioHomeSections(sections: StudioHomeSections) {
  await patchHomePageGlobal(sections);
  return getStudioHomeSections();
}
