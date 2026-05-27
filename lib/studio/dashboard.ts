import "server-only";

import { allInsightSlugs } from "@/lib/insights";
import { getPublicSiteUrl } from "@/lib/public-site-url";
import { getPayloadClient } from "@/lib/payload";
import { analyzeSiteSeo } from "@/lib/seo/analyze";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";
import { getStudioHeroSlides } from "@/lib/studio/hero-slides";
import { getStudioTrustBadges } from "@/lib/studio/trust-badges";

const STATIC_SITEMAP_PATHS = 11;

async function getInboxStats() {
  const payload = await getPayloadClient();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [all, recent] = await Promise.all([
    payload.find({
      collection: "contact-submissions",
      limit: 0,
      pagination: false,
      overrideAccess: true,
    }),
    payload.find({
      collection: "contact-submissions",
      where: { createdAt: { greater_than: weekAgo } },
      limit: 0,
      pagination: false,
      overrideAccess: true,
    }),
  ]);
  return { total: all.totalDocs, last7Days: recent.totalDocs };
}

type CountableSlug =
  | "services"
  | "industries"
  | "insights"
  | "testimonials"
  | "metrics"
  | "value-props"
  | "control-centre-steps";

async function countCollection(slug: CountableSlug, publishedOnly = false) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: slug,
      where: publishedOnly ? { published: { equals: true } } : undefined,
      limit: 0,
      pagination: false,
    });
    return result.totalDocs;
  } catch {
    return 0;
  }
}

export type StudioDashboardSnapshot = {
  generatedAt: string;
  content: {
    heroSlides: number;
    trustBadges: number;
    services: { published: number; total: number };
    industries: { published: number; total: number };
    insights: { published: number; draft: number };
    testimonials: { published: number; total: number };
    metrics: { published: number; total: number };
    valueProps: { published: number; total: number };
    flowSteps: number;
  };
  inbox: {
    total: number;
    last7Days: number;
  };
  seo: {
    score: number;
    checks: ReturnType<typeof analyzeSiteSeo>["checks"];
    siteUrl: string;
    sitemapUrl: string;
  };
};

export async function getStudioDashboardSnapshot(): Promise<StudioDashboardSnapshot> {
  const [
    hero,
    trust,
    servicesPub,
    servicesTotal,
    industriesPub,
    industriesTotal,
    insightsPub,
    insightsDraft,
    testimonialsPub,
    testimonialsTotal,
    metricsPub,
    metricsTotal,
    valuePropsPub,
    valuePropsTotal,
    flowSteps,
    inbox,
    seoConfig,
    insightSlugs,
  ] = await Promise.all([
    getStudioHeroSlides().catch(() => ({ slides: [] })),
    getStudioTrustBadges().catch(() => ({ badges: [] })),
    countCollection("services", true).catch(() => 0),
    countCollection("services").catch(() => 0),
    countCollection("industries", true).catch(() => 0),
    countCollection("industries").catch(() => 0),
    countCollection("insights", true).catch(() => 0),
    getPayloadClient()
      .then((p) =>
        p.find({
          collection: "insights",
          where: { published: { equals: false } },
          limit: 0,
          pagination: false,
        }),
      )
      .then((r) => r.totalDocs)
      .catch(() => 0),
    countCollection("testimonials", true).catch(() => 0),
    countCollection("testimonials").catch(() => 0),
    countCollection("metrics", true).catch(() => 0),
    countCollection("metrics").catch(() => 0),
    countCollection("value-props", true).catch(() => 0),
    countCollection("value-props").catch(() => 0),
    countCollection("control-centre-steps", true).catch(() => 0),
    getInboxStats().catch(() => ({ total: 0, last7Days: 0 })),
    getSiteSeoConfig(),
    allInsightSlugs(),
  ]);

  const base = getPublicSiteUrl().replace(/\/$/, "");
  const sitemapUrlCount = STATIC_SITEMAP_PATHS + insightSlugs.length;

  const last7Days = inbox.last7Days;
  const inboxTotal = inbox.total;

  const fallbackSeo = {
    siteName: "Universe Security",
    tagline: "",
    description: "",
    title: "Universe Security",
    metaDescription: "",
    siteUrl: base,
    metadataBase: new URL(base),
    usingFallbackUrl: base.includes("example.com"),
    ogImageUrl: null,
    twitterHandle: null,
    robotsNoIndex: false,
    logoUrl: null,
    socialTitle: null,
  };

  const seo = seoConfig ?? fallbackSeo;
  const { score, checks } = analyzeSiteSeo(seo, {
    publishedInsights: insightsPub,
    draftInsights: insightsDraft,
    sitemapUrlCount,
    hasLogo: Boolean(seo.logoUrl),
  });

  return {
    generatedAt: new Date().toISOString(),
    content: {
      heroSlides: hero.slides.length,
      trustBadges: trust.badges.length,
      services: { published: servicesPub, total: servicesTotal },
      industries: { published: industriesPub, total: industriesTotal },
      insights: { published: insightsPub, draft: insightsDraft },
      testimonials: { published: testimonialsPub, total: testimonialsTotal },
      metrics: { published: metricsPub, total: metricsTotal },
      valueProps: { published: valuePropsPub, total: valuePropsTotal },
      flowSteps,
    },
    inbox: {
      total: inboxTotal,
      last7Days,
    },
    seo: {
      score,
      checks,
      siteUrl: seo.siteUrl,
      sitemapUrl: `${base}/sitemap.xml`,
    },
  };
}
