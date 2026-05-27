import "server-only";

import type { HomePage } from "@/payload-types";
import { getStudioMetrics, saveStudioMetrics, type StudioMetric } from "@/lib/studio/collections/metrics";
import { getStudioHomeSections, saveStudioHomeSections } from "@/lib/studio/home-sections";

export type StudioKpisSection = NonNullable<HomePage["kpisSection"]>;

export type StudioResponseMetrics = {
  kpisSection: StudioKpisSection;
  items: StudioMetric[];
  updatedAt: string | null;
};

export async function getStudioResponseMetrics(): Promise<StudioResponseMetrics> {
  const [sections, metrics] = await Promise.all([getStudioHomeSections(), getStudioMetrics()]);
  return {
    kpisSection: sections.sections.kpisSection ?? { heading: "", intro: "" },
    items: metrics.items,
    updatedAt: sections.updatedAt,
  };
}

export async function saveStudioResponseMetrics(payload: {
  kpisSection: StudioKpisSection;
  items: StudioMetric[];
}): Promise<StudioResponseMetrics> {
  const current = await getStudioHomeSections();
  await saveStudioHomeSections({
    ...current.sections,
    kpisSection: payload.kpisSection,
  });
  await saveStudioMetrics(payload.items);
  return getStudioResponseMetrics();
}
