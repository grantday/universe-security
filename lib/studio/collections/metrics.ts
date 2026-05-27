import "server-only";

import type { Metric } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioMetric = {
  payloadId?: number;
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  note?: string;
  numericValue?: number;
  published: boolean;
  order: number;
};

function map(doc: Metric): StudioMetric {
  return {
    payloadId: doc.id,
    label: doc.label,
    value: doc.value,
    suffix: doc.suffix ?? undefined,
    prefix: doc.prefix ?? undefined,
    note: doc.note ?? undefined,
    numericValue: doc.numericValue ?? undefined,
    published: doc.published ?? true,
    order: doc.order ?? 0,
  };
}

export async function getStudioMetrics() {
  const result = await listCollectionDocs("metrics", "order");
  return { items: result.docs.map((d) => map(d as Metric)) };
}

export async function saveStudioMetrics(items: StudioMetric[]) {
  await syncCollectionDocs(
    "metrics",
    items,
    (item, index) => ({
      label: item.label,
      value: item.value,
      suffix: item.suffix || undefined,
      prefix: item.prefix || undefined,
      note: item.note || undefined,
      numericValue: item.numericValue,
      published: item.published,
      order: index,
    }),
    ["/"],
    0,
  );
  return getStudioMetrics();
}
