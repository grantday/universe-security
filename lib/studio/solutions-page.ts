import "server-only";

import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import type { SolutionsPage } from "@/payload-types";

export type StudioSolutionsPage = Pick<
  SolutionsPage,
  "title" | "intro" | "footerHeading" | "footerIntro" | "footerCtaLabel" | "footerCtaHref"
>;

export async function getStudioSolutionsPage() {
  const payload = await getPayloadClient();
  const doc = (await payload.findGlobal({ slug: "solutions-page", depth: 0 })) as SolutionsPage;
  return {
    page: {
      title: doc.title,
      intro: doc.intro,
      footerHeading: doc.footerHeading,
      footerIntro: doc.footerIntro,
      footerCtaLabel: doc.footerCtaLabel,
      footerCtaHref: doc.footerCtaHref,
    },
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function saveStudioSolutionsPage(page: StudioSolutionsPage) {
  const payload = await getPayloadClient();
  const doc = (await payload.findGlobal({ slug: "solutions-page", depth: 0 })) as SolutionsPage;
  const { id: _id, updatedAt: _u, createdAt: _c, ...rest } = doc;

  await payload.updateGlobal({
    slug: "solutions-page",
    data: { ...rest, ...page },
  });

  revalidatePath("/solutions", "layout");
  return getStudioSolutionsPage();
}
