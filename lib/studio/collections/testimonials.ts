import "server-only";

import type { Testimonial } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioTestimonial = {
  payloadId?: number;
  quote: string;
  author: string;
  org: string;
  published: boolean;
  order: number;
};

function map(doc: Testimonial): StudioTestimonial {
  return {
    payloadId: doc.id,
    quote: doc.quote,
    author: doc.author,
    org: doc.org,
    published: doc.published ?? true,
    order: doc.order ?? 0,
  };
}

export async function getStudioTestimonials() {
  const result = await listCollectionDocs("testimonials", "order");
  return { items: result.docs.map((d) => map(d as Testimonial)) };
}

export async function saveStudioTestimonials(items: StudioTestimonial[]) {
  await syncCollectionDocs(
    "testimonials",
    items,
    (item, index) => ({
      quote: item.quote,
      author: item.author,
      org: item.org,
      published: item.published,
      order: index,
    }),
    ["/"],
    0,
  );
  return getStudioTestimonials();
}
