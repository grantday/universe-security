import "server-only";

import type { IconKey } from "@/lib/content/schema";
import { imageUrl } from "@/lib/image";
import type { Industry } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioIndustry = {
  payloadId?: number;
  title: string;
  blurb: string;
  icon: IconKey;
  imageId: number | null;
  imageUrl: string;
  published: boolean;
  order: number;
};

function map(doc: Industry): StudioIndustry {
  let imageId: number | null = null;
  let imageUrlStr = "";
  if (typeof doc.image === "object" && doc.image) {
    imageId = doc.image.id;
    imageUrlStr = imageUrl(doc.image, "card");
  } else if (typeof doc.image === "number") {
    imageId = doc.image;
  }
  return {
    payloadId: doc.id,
    title: doc.title,
    blurb: doc.blurb,
    icon: doc.icon as IconKey,
    imageId,
    imageUrl: imageUrlStr,
    published: doc.published ?? true,
    order: doc.order ?? 0,
  };
}

export async function getStudioIndustries() {
  const result = await listCollectionDocs("industries", "order");
  return { items: result.docs.map((d) => map(d as Industry)) };
}

export async function saveStudioIndustries(items: StudioIndustry[]) {
  await syncCollectionDocs(
    "industries",
    items,
    (item, index) => ({
      title: item.title,
      blurb: item.blurb,
      icon: item.icon,
      image: item.imageId ?? undefined,
      published: item.published,
      order: index,
    }),
    ["/industries"],
    1,
  );
  return getStudioIndustries();
}
