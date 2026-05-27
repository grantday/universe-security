import "server-only";

import { imageUrl } from "@/lib/image";
import type { ClientLogo } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioClientLogo = {
  payloadId?: number;
  name: string;
  published: boolean;
  order: number;
  imageId: number | null;
  imageUrl: string;
};

function map(doc: ClientLogo): StudioClientLogo {
  let imageId: number | null = null;
  let imageUrlStr = "";
  if (typeof doc.logo === "object" && doc.logo) {
    imageId = doc.logo.id;
    imageUrlStr = imageUrl(doc.logo);
  } else if (typeof doc.logo === "number") {
    imageId = doc.logo;
  }
  return {
    payloadId: doc.id,
    name: doc.name,
    published: doc.published ?? true,
    order: doc.order ?? 0,
    imageId,
    imageUrl: imageUrlStr,
  };
}

export async function getStudioClientLogos() {
  const result = await listCollectionDocs("client-logos", "order");
  return { items: result.docs.map((d) => map(d as ClientLogo)) };
}

export async function saveStudioClientLogos(items: StudioClientLogo[]) {
  await syncCollectionDocs(
    "client-logos",
    items,
    (item, index) => ({
      name: item.name,
      published: item.published,
      order: index,
      logo: item.imageId ?? undefined,
    }),
    ["/", "/solutions"],
    0,
  );
  return getStudioClientLogos();
}
