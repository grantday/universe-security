import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  getInsightBySlugFromPayload,
  getInsightSlugsFromPayload,
  getPublishedInsights,
  type InsightDetail,
  type InsightListItem,
} from "@/lib/payload/queries";
import { lexicalToText } from "@/lib/payload/lexical";

const dir = path.join(process.cwd(), "content/insights");

export function normalizeInsightSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).trim().replace(/^\/+|\/+$/g, "");
  } catch {
    return slug.trim().replace(/^\/+|\/+$/g, "");
  }
}

export function payloadInsightHasBody(insight: InsightDetail): boolean {
  return Boolean(lexicalToText(insight.content).trim());
}

function mergeInsightLists(payloadItems: InsightListItem[], mdxItems: InsightListItem[]): InsightListItem[] {
  const bySlug = new Map<string, InsightListItem>();
  for (const item of mdxItems) {
    bySlug.set(normalizeInsightSlug(item.slug), { ...item, slug: normalizeInsightSlug(item.slug) });
  }
  for (const item of payloadItems) {
    bySlug.set(normalizeInsightSlug(item.slug), { ...item, slug: normalizeInsightSlug(item.slug) });
  }
  return [...bySlug.values()].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export type InsightFrontmatter = {
  title: string;
  date: string;
  description: string;
};

export type LegacyInsightListItem = InsightFrontmatter & { slug: string };

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllInsights(): LegacyInsightListItem[] {
  return getInsightSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
      const { data } = matter(raw);
      const d = data as InsightFrontmatter;
      return { slug, ...d };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightBySlug(slug: string): { frontmatter: InsightFrontmatter; content: string } | null {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as InsightFrontmatter, content };
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-ZW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export async function listInsights(page = 1, limit = 9): Promise<{
  items: InsightListItem[];
  source: "payload" | "mdx" | "merged";
}> {
  const payloadItems = await getPublishedInsights(200, 1);
  const mdxItems = getAllInsights().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    publishedAt: p.date,
  }));

  if (payloadItems.length && mdxItems.length) {
    const merged = mergeInsightLists(payloadItems, mdxItems);
    const start = (page - 1) * limit;
    return { items: merged.slice(start, start + limit), source: "merged" };
  }

  if (payloadItems.length) {
    const start = (page - 1) * limit;
    return { items: payloadItems.slice(start, start + limit), source: "payload" };
  }

  const start = (page - 1) * limit;
  return {
    items: mdxItems.slice(start, start + limit),
    source: "mdx",
  };
}

export async function allInsightSlugs(): Promise<string[]> {
  const payloadSlugs = await getInsightSlugsFromPayload();
  const mdxSlugs = getInsightSlugs();
  return [...new Set([...payloadSlugs, ...mdxSlugs].map(normalizeInsightSlug))];
}

export async function loadInsight(slug: string): Promise<
  | { source: "payload"; insight: InsightDetail; mdxFallback: { frontmatter: InsightFrontmatter; content: string } | null }
  | { source: "mdx"; frontmatter: InsightFrontmatter; content: string }
  | null
> {
  const normalized = normalizeInsightSlug(slug);
  const payloadInsight = await getInsightBySlugFromPayload(normalized);
  const mdx = getInsightBySlug(normalized);

  if (payloadInsight) {
    return {
      source: "payload",
      insight: { ...payloadInsight, slug: normalized },
      mdxFallback: mdx,
    };
  }
  if (mdx) {
    return { source: "mdx", ...mdx };
  }
  return null;
}

export { formatDate };
