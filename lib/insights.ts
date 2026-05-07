import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/insights");

export type InsightFrontmatter = {
  title: string;
  date: string;
  description: string;
};

export type InsightListItem = InsightFrontmatter & { slug: string };

export function getInsightSlugs(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllInsights(): InsightListItem[] {
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
