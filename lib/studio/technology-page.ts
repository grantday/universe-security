import "server-only";

import type { TechnologyPage } from "@/payload-types";
import { getPayloadGlobal, patchPayloadGlobal } from "@/lib/studio/patch-global";

export type StudioTechnologyPage = Pick<
  TechnologyPage,
  "title" | "intro" | "stack" | "dataSecurityHeading" | "dataSecurity" | "ctaLabel" | "ctaHref"
>;

export async function getStudioTechnologyPage() {
  const doc = await getPayloadGlobal("technology-page", 0);
  return {
    page: {
      title: doc.title,
      intro: doc.intro,
      stack: doc.stack ?? [],
      dataSecurityHeading: doc.dataSecurityHeading,
      dataSecurity: doc.dataSecurity ?? [],
      ctaLabel: doc.ctaLabel,
      ctaHref: doc.ctaHref,
    },
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function saveStudioTechnologyPage(page: StudioTechnologyPage) {
  if (!page.stack?.length) throw new Error("At least one stack item is required.");
  if (!page.dataSecurity?.length) throw new Error("At least one data security item is required.");
  await patchPayloadGlobal("technology-page", page, ["/technology"]);
  return getStudioTechnologyPage();
}
