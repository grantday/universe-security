import type { SiteSeoConfig } from "@/lib/seo/site-seo";

export type SeoCheckStatus = "pass" | "warn" | "fail";

export type SeoCheck = {
  id: string;
  label: string;
  status: SeoCheckStatus;
  detail: string;
};

export function analyzeSiteSeo(
  seo: SiteSeoConfig,
  context: {
    publishedInsights: number;
    draftInsights: number;
    sitemapUrlCount: number;
    hasLogo: boolean;
  },
): { score: number; checks: SeoCheck[] } {
  const checks: SeoCheck[] = [];

  if (seo.usingFallbackUrl) {
    checks.push({
      id: "site-url",
      label: "Production site URL",
      status: "fail",
      detail: "Set NEXT_PUBLIC_SITE_URL to your live domain (with https://).",
    });
  } else {
    checks.push({
      id: "site-url",
      label: "Production site URL",
      status: "pass",
      detail: seo.siteUrl,
    });
  }

  const descLen = seo.metaDescription.length;
  if (descLen < 70) {
    checks.push({
      id: "meta-description",
      label: "Meta description length",
      status: "warn",
      detail: `${descLen} characters — aim for 120–160 for search snippets.`,
    });
  } else if (descLen > 160) {
    checks.push({
      id: "meta-description",
      label: "Meta description length",
      status: "warn",
      detail: `${descLen} characters — may be truncated in Google results.`,
    });
  } else {
    checks.push({
      id: "meta-description",
      label: "Meta description length",
      status: "pass",
      detail: `${descLen} characters — good range for search snippets.`,
    });
  }

  if (seo.ogImageUrl) {
    checks.push({
      id: "og-image",
      label: "Social share image",
      status: "pass",
      detail: "Open Graph image is set for link previews.",
    });
  } else {
    checks.push({
      id: "og-image",
      label: "Social share image",
      status: "warn",
      detail: "Upload a 1200×630 image under Site settings → SEO & social.",
    });
  }

  if (context.hasLogo) {
    checks.push({
      id: "logo",
      label: "Brand logo",
      status: "pass",
      detail: "Logo is configured for header, footer, and structured data.",
    });
  } else {
    checks.push({
      id: "logo",
      label: "Brand logo",
      status: "warn",
      detail: "Add a logo in Site settings for stronger brand signals.",
    });
  }

  if (seo.robotsNoIndex) {
    checks.push({
      id: "robots",
      label: "Search indexing",
      status: "fail",
      detail: "“Discourage indexing” is on — the public site will not appear in search.",
    });
  } else {
    checks.push({
      id: "robots",
      label: "Search indexing",
      status: "pass",
      detail: "Site is open to indexing (robots.txt + meta robots).",
    });
  }

  if (context.publishedInsights > 0) {
    checks.push({
      id: "insights",
      label: "Insights / blog",
      status: "pass",
      detail: `${context.publishedInsights} published article(s) in sitemap.`,
    });
  } else {
    checks.push({
      id: "insights",
      label: "Insights / blog",
      status: "warn",
      detail: "Publish insights to grow organic traffic and internal links.",
    });
  }

  if (context.draftInsights > 0) {
    checks.push({
      id: "draft-insights",
      label: "Draft articles",
      status: "warn",
      detail: `${context.draftInsights} draft(s) not indexed until published.`,
    });
  }

  checks.push({
    id: "sitemap",
    label: "Sitemap coverage",
    status: context.sitemapUrlCount >= 8 ? "pass" : "warn",
    detail: `${context.sitemapUrlCount} URLs in sitemap.xml (static pages + insights).`,
  });

  const weights: Record<SeoCheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 };
  const score = Math.round((checks.reduce((sum, c) => sum + weights[c.status], 0) / checks.length) * 100);

  return { score, checks };
}
