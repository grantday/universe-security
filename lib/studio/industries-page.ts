import "server-only";

import { getPayloadGlobal, patchPayloadGlobal } from "@/lib/studio/patch-global";
import type { IndustriesPage } from "@/payload-types";

export type StudioIndustriesPage = Pick<IndustriesPage, "title" | "intro">;

const DEFAULT_HEADER = {
  title: "Industries",
  intro: "Sector-specific playbooks backed by our 24/7 control centre and licensed response teams.",
};

export async function getStudioIndustriesPage() {
  try {
    const doc = await getPayloadGlobal("industries-page", 0);
    return {
      page: {
        title: doc.title?.trim() || DEFAULT_HEADER.title,
        intro: doc.intro?.trim() || DEFAULT_HEADER.intro,
      },
      updatedAt: doc.updatedAt ?? null,
    };
  } catch {
    return { page: DEFAULT_HEADER, updatedAt: null };
  }
}

export async function saveStudioIndustriesPage(page: StudioIndustriesPage) {
  await patchPayloadGlobal("industries-page", page, ["/industries"]);
  return getStudioIndustriesPage();
}
