import type { MetadataRoute } from "next";
import { allInsightSlugs } from "@/lib/insights";
import { getPublicSiteUrl } from "@/lib/public-site-url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getPublicSiteUrl().replace(/\/$/, "");
  const staticPaths = [
    "",
    "/solutions",
    "/industries",
    "/control-centre",
    "/technology",
    "/insights",
    "/company",
    "/contact",
    "/privacy",
    "/terms",
    "/credits",
  ];
  const insightSlugs = await allInsightSlugs();
  const insightPaths = insightSlugs.map((slug) => `/insights/${slug}`);
  const all = [...staticPaths, ...insightPaths];
  const lastModified = new Date();

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path.startsWith("/insights/") ? ("monthly" as const) : ("weekly" as const),
    priority: path === "" ? 1 : path.startsWith("/insights/") ? 0.6 : 0.8,
  }));
}
