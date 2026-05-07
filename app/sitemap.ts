import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getInsightSlugs } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
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
  ];
  const insightPaths = getInsightSlugs().map((slug) => `/insights/${slug}`);
  const all = [...staticPaths, ...insightPaths];
  const lastModified = new Date();
  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path.startsWith("/insights/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/insights/") ? 0.6 : 0.8,
  }));
}
