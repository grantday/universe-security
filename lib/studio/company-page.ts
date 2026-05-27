import "server-only";

import type { CompanyPage } from "@/payload-types";
import { getPayloadGlobal, patchPayloadGlobal } from "@/lib/studio/patch-global";

export type StudioCompanyPage = Pick<
  CompanyPage,
  "title" | "mission" | "vision" | "valuesHeading" | "values" | "compliance"
>;

export async function getStudioCompanyPage() {
  const doc = await getPayloadGlobal("company-page", 0);
  return {
    page: {
      title: doc.title,
      mission: doc.mission,
      vision: doc.vision,
      valuesHeading: doc.valuesHeading,
      values: doc.values ?? [],
      compliance: doc.compliance,
    },
    updatedAt: doc.updatedAt ?? null,
  };
}

export async function saveStudioCompanyPage(page: StudioCompanyPage) {
  if (!page.values?.length) throw new Error("At least one value is required.");
  await patchPayloadGlobal("company-page", page, ["/company"]);
  return getStudioCompanyPage();
}
