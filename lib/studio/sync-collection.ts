import "server-only";

import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import type { Config } from "@/payload-types";

export type CollectionSlug = keyof Config["collections"];

export async function listCollectionDocs<S extends CollectionSlug>(
  collection: S,
  sort = "order",
  limit = 100,
) {
  const payload = await getPayloadClient();
  return payload.find({
    collection,
    limit,
    sort,
    pagination: false,
    overrideAccess: true,
  });
}

export async function syncCollectionDocs<T extends { payloadId?: number }>(
  collection: CollectionSlug,
  items: T[],
  buildData: (item: T, index: number) => Record<string, unknown>,
  revalidatePaths: string[],
  minItems = 0,
) {
  if (items.length < minItems) {
    throw new Error(`At least ${minItems} item(s) required.`);
  }

  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection,
    limit: 200,
    pagination: false,
    overrideAccess: true,
  });

  const keepIds = new Set(items.map((i) => i.payloadId).filter((id): id is number => typeof id === "number"));

  for (const doc of existing.docs) {
    if (!keepIds.has(doc.id)) {
      await payload.delete({ collection, id: doc.id, overrideAccess: true });
    }
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]!;
    const data = buildData(item, i);
    if (item.payloadId) {
      await payload.update({ collection, id: item.payloadId, data, overrideAccess: true });
    } else {
      await payload.create({ collection, data, overrideAccess: true });
    }
  }

  for (const path of revalidatePaths) {
    revalidatePath(path, "layout");
  }
}
