import "server-only";

import { mergeContent } from "@/lib/content/merge";
import type { SiteContent } from "@/lib/content/schema";
import { canUsePayloadDatabase } from "@/lib/payload/database";
import { getPayloadClient } from "@/lib/payload";
import {
  mapCompanyPage,
  mapContactPage,
  mapControlCentrePage,
  mapControlCentreSteps,
  mapHomePageGlobal,
  mapIndustries,
  mapMetric,
  mapService,
  mapSiteSettings,
  mapSolutionsPage,
  mapTechnologyPage,
  mapTestimonial,
  mapValueProp,
  type FlowStep,
  type ValuePropItem,
} from "@/lib/payload/map-content";
import { imageUrl } from "@/lib/image";
import type { InsightDetailExtended } from "@/lib/payload/insight-types";
import type { Insight } from "@/payload-types";

async function payloadReady() {
  return canUsePayloadDatabase();
}

export async function getPublishedMetrics(): Promise<SiteContent["kpis"]> {
  if (!(await payloadReady())) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "metrics",
      where: { published: { equals: true } },
      sort: "order",
      limit: 12,
    });
    return result.docs.map(mapMetric);
  } catch {
    return [];
  }
}

export async function getControlCentreSteps(): Promise<FlowStep[]> {
  if (!(await payloadReady())) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "control-centre-steps",
      where: { published: { equals: true } },
      sort: "order",
      limit: 10,
    });
    return mapControlCentreSteps(result.docs);
  } catch {
    return [];
  }
}

export async function getValueProps(): Promise<ValuePropItem[]> {
  if (!(await payloadReady())) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "value-props",
      where: { published: { equals: true } },
      sort: "order",
      limit: 20,
    });
    return result.docs.map(mapValueProp);
  } catch {
    return [];
  }
}

export type InsightListItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
};

export type InsightDetail = InsightListItem & {
  content: Insight["content"];
  contentType: InsightDetailExtended["contentType"];
  heroImageUrl: string;
  caseStudy: InsightDetailExtended["caseStudy"];
};

export async function getPublishedInsights(limit = 10, page = 1): Promise<InsightListItem[]> {
  if (!(await payloadReady())) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "insights",
      where: { published: { equals: true } },
      sort: "-publishedAt",
      limit,
      page,
    });
    return result.docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt,
      publishedAt: doc.publishedAt ?? doc.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getInsightSlugsFromPayload(): Promise<string[]> {
  const items = await getPublishedInsights(100);
  return items.map((i) => i.slug);
}

export async function getInsightBySlugFromPayload(slug: string): Promise<InsightDetail | null> {
  if (!(await payloadReady())) return null;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "insights",
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
    });
    const doc = result.docs[0];
    if (!doc) return null;
    const contentType = doc.contentType === "case-study" ? "case-study" : "article";
    const caseStudy =
      contentType === "case-study" && doc.caseStudy
        ? {
            problem: doc.caseStudy.problem ?? "",
            approach: doc.caseStudy.approach ?? "",
            metrics: (doc.caseStudy.metrics ?? []).map((m) => ({
              label: m.label,
              value: m.value,
            })),
          }
        : null;
    return {
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt,
      publishedAt: doc.publishedAt ?? doc.createdAt,
      content: doc.content,
      contentType,
      heroImageUrl: typeof doc.heroImage === "object" && doc.heroImage ? imageUrl(doc.heroImage, "hero") : "",
      caseStudy,
    };
  } catch {
    return null;
  }
}

/** Returns Payload-backed content when the CMS has been seeded; otherwise null. */
export async function getPayloadSiteContent(): Promise<SiteContent | null> {
  if (!(await payloadReady())) return null;

  try {
    const payload = await getPayloadClient();

    const [
      siteSettings,
      homePage,
      services,
      testimonials,
      metrics,
      valueProps,
      industries,
      solutionsPage,
      industriesPage,
      controlCentrePage,
      companyPage,
      technologyPage,
      contactPage,
    ] = await Promise.all([
      payload.findGlobal({ slug: "site-settings", depth: 1 }),
      payload.findGlobal({ slug: "home-page", depth: 1 }),
      payload.find({
        collection: "services",
        where: { published: { equals: true } },
        sort: "order",
        limit: 20,
        depth: 1,
      }),
      payload.find({
        collection: "testimonials",
        where: { published: { equals: true } },
        sort: "order",
        limit: 20,
      }),
      payload.find({
        collection: "metrics",
        where: { published: { equals: true } },
        sort: "order",
        limit: 20,
      }),
      payload.find({
        collection: "value-props",
        where: { published: { equals: true } },
        sort: "order",
        limit: 20,
      }),
      payload.find({
        collection: "industries",
        where: { published: { equals: true } },
        sort: "order",
        limit: 30,
        depth: 1,
      }),
      payload.findGlobal({ slug: "solutions-page" }),
      payload.findGlobal({ slug: "industries-page" }),
      payload.findGlobal({ slug: "control-centre-page" }),
      payload.findGlobal({ slug: "company-page" }),
      payload.findGlobal({ slug: "technology-page" }),
      payload.findGlobal({ slug: "contact-page" }),
    ]);

    if (!siteSettings?.name || !homePage?.heroSlides?.length) {
      return null;
    }

    const mapped = mapSiteSettings(siteSettings);
    const homeMapped = mapHomePageGlobal(homePage);

    const solutionsMapped =
      solutionsPage?.title && services.docs.length
        ? mapSolutionsPage(solutionsPage, services.docs)
        : null;

    const pagesPartial: Partial<SiteContent["pages"]> = {};
    if (industries.docs.length) {
      pagesPartial.industries = mapIndustries(industries.docs, industriesPage);
    }
    if (solutionsMapped?.sections.length) {
      pagesPartial.solutions = solutionsMapped;
    }
    if (controlCentrePage?.heroTitle) {
      pagesPartial.controlCentre = mapControlCentrePage(controlCentrePage);
    }
    if (companyPage?.title) {
      pagesPartial.company = mapCompanyPage(companyPage);
    }
    if (technologyPage?.title) {
      pagesPartial.technology = mapTechnologyPage(technologyPage);
    }
    if (contactPage?.title) {
      pagesPartial.contact = mapContactPage(contactPage);
    }

    const partial = {
      ...mapped,
      heroSlides: homeMapped.heroSlides,
      services: services.docs.slice(0, 4).map(mapService),
      testimonials: testimonials.docs.map(mapTestimonial),
      kpis: metrics.docs.map(mapMetric),
      home: {
        ...homeMapped.home,
        whyChoose: {
          ...homeMapped.home.whyChoose,
          pillars: valueProps.docs.map(mapValueProp),
        },
      },
      ...(Object.keys(pagesPartial).length ? { pages: pagesPartial } : {}),
    } as Partial<SiteContent>;

    return mergeContent(partial);
  } catch {
    return null;
  }
}

export type SolutionsPageExtras = {
  footerHeading: string;
  footerIntro: string;
  footerCtaLabel: string;
  footerCtaHref: string;
};

export async function getSolutionsPageExtras(): Promise<SolutionsPageExtras | null> {
  if (!(await payloadReady())) return null;
  try {
    const payload = await getPayloadClient();
    const page = await payload.findGlobal({ slug: "solutions-page" });
    if (!page?.footerHeading) return null;
    return {
      footerHeading: page.footerHeading,
      footerIntro: page.footerIntro,
      footerCtaLabel: page.footerCtaLabel,
      footerCtaHref: page.footerCtaHref,
    };
  } catch {
    return null;
  }
}
