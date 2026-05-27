import "server-only";

import type { IconKey } from "@/lib/content/schema";
import type { ValueProp } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioValueProp = {
  payloadId?: number;
  title: string;
  body: string;
  icon: IconKey;
  featured: boolean;
  published: boolean;
  order: number;
};

function map(doc: ValueProp): StudioValueProp {
  return {
    payloadId: doc.id,
    title: doc.title,
    body: doc.body,
    icon: doc.icon as IconKey,
    featured: doc.featured ?? false,
    published: doc.published ?? true,
    order: doc.order ?? 0,
  };
}

export async function getStudioValueProps() {
  const result = await listCollectionDocs("value-props", "order");
  return { items: result.docs.map((d) => map(d as ValueProp)) };
}

export async function saveStudioValueProps(items: StudioValueProp[]) {
  await syncCollectionDocs(
    "value-props",
    items,
    (item, index) => ({
      title: item.title,
      body: item.body,
      icon: item.icon,
      featured: item.featured,
      published: item.published,
      order: index,
    }),
    ["/"],
    0,
  );
  return getStudioValueProps();
}
