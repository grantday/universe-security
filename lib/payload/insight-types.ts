import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export type CaseStudyMetric = { label: string; value: string };

export type InsightContentType = "article" | "case-study";

export type InsightDetailExtended = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  content: SerializedEditorState | null | undefined;
  contentType: InsightContentType;
  heroImageUrl: string;
  caseStudy: {
    problem: string;
    approach: string;
    metrics: CaseStudyMetric[];
  } | null;
};
