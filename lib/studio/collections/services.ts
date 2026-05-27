import "server-only";

import { imageUrl } from "@/lib/image";
import type { ImageTheme } from "@/lib/content/schema";
import type { Service } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioService = {
  payloadId?: number;
  title: string;
  slug: string;
  category: "home" | "business" | "industrial" | "specialised";
  description: string;
  theme: ImageTheme;
  bullets: string[];
  imageId: number | null;
  imageUrl: string;
  published: boolean;
  order: number;
};

function map(doc: Service): StudioService {
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
    slug: doc.slug,
    category: doc.category,
    description: doc.description,
    theme: doc.theme,
    bullets: (doc.items ?? []).map((i) => i.text),
    imageId,
    imageUrl: imageUrlStr,
    published: doc.published ?? true,
    order: doc.order ?? 0,
  };
}

export async function getStudioServices() {
  const result = await listCollectionDocs("services", "order");
  return { items: result.docs.map((d) => map(d as Service)) };
}

export async function saveStudioServices(items: StudioService[]) {
  await syncCollectionDocs(
    "services",
    items,
    (item, index) => ({
      title: item.title,
      slug: item.slug,
      category: item.category,
      description: item.description,
      theme: item.theme,
      items: item.bullets.map((text) => ({ text })),
      image: item.imageId ?? undefined,
      published: item.published,
      order: index,
    }),
    ["/", "/solutions"],
    1,
  );
  return getStudioServices();
}
