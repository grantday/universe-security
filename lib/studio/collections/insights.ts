import "server-only";

import { revalidatePath } from "next/cache";
import { lexicalToText, textToLexical } from "@/lib/payload/lexical";
import { normalizeInsightSlug } from "@/lib/insights";
import { imageUrl } from "@/lib/image";
import type { Insight } from "@/payload-types";
import { listCollectionDocs, syncCollectionDocs } from "@/lib/studio/sync-collection";

export type StudioCaseStudyMetric = { label: string; value: string };

export type StudioInsight = {
  payloadId?: number;
  title: string;
  slug: string;
  contentType: "article" | "case-study";
  excerpt: string;
  body: string;
  caseProblem: string;
  caseApproach: string;
  caseMetrics: StudioCaseStudyMetric[];
  published: boolean;
  publishedAt: string;
  imageId: number | null;
  imageUrl: string;
};

function map(doc: Insight): StudioInsight {
  let imageId: number | null = null;
  let imageUrlStr = "";
  if (typeof doc.heroImage === "object" && doc.heroImage) {
    imageId = doc.heroImage.id;
    imageUrlStr = imageUrl(doc.heroImage, "hero");
  } else if (typeof doc.heroImage === "number") {
    imageId = doc.heroImage;
  }
  const contentType = doc.contentType === "case-study" ? "case-study" : "article";
  return {
    payloadId: doc.id,
    title: doc.title,
    slug: doc.slug,
    contentType,
    excerpt: doc.excerpt,
    body: lexicalToText(doc.content),
    caseProblem: doc.caseStudy?.problem ?? "",
    caseApproach: doc.caseStudy?.approach ?? "",
    caseMetrics: (doc.caseStudy?.metrics ?? []).map((m) => ({ label: m.label, value: m.value })),
    published: doc.published ?? false,
    publishedAt: doc.publishedAt ? String(doc.publishedAt).slice(0, 10) : "",
    imageId,
    imageUrl: imageUrlStr,
  };
}

export async function getStudioInsights() {
  const result = await listCollectionDocs("insights", "-publishedAt");
  return { items: result.docs.map((d) => map(d as Insight)) };
}

export async function saveStudioInsights(items: StudioInsight[]) {
  await syncCollectionDocs(
    "insights",
    items,
    (item) => ({
      title: item.title,
      slug: normalizeInsightSlug(item.slug),
      contentType: item.contentType,
      excerpt: item.excerpt,
      content: textToLexical(item.body),
      caseStudy:
        item.contentType === "case-study"
          ? {
              problem: item.caseProblem,
              approach: item.caseApproach,
              metrics: item.caseMetrics,
            }
          : undefined,
      published: item.published,
      publishedAt: item.publishedAt || undefined,
      heroImage: item.imageId ?? undefined,
    }),
    ["/insights"],
    0,
  );

  for (const item of items) {
    if (item.published && item.slug) {
      revalidatePath(`/insights/${normalizeInsightSlug(item.slug)}`);
    }
  }
  revalidatePath("/insights");

  return getStudioInsights();
}
