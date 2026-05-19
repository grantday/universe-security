import { siteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  controlCentreStepsQuery,
  homeHeroQuery,
  insightsTeaserQuery,
  metricsQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
  valuePropsQuery,
} from "@/sanity/lib/queries";
import type {
  ControlCentreStepDoc,
  HomeHeroDoc,
  InsightTeaserDoc,
  MetricDoc,
  ServiceDoc,
  SiteSettingsDoc,
  TestimonialDoc,
  ValuePropDoc,
} from "@/lib/sanity/types";

export async function loadSiteSettings(): Promise<SiteSettingsDoc> {
  const doc = await sanityFetch<SiteSettingsDoc>({ query: siteSettingsQuery, tags: ["siteSettings"] });
  if (doc) return doc;
  return {
    companyName: siteConfig.name,
    tagline: siteConfig.tagline,
    phonePrimary: siteConfig.salesPhoneDisplay,
    phoneEmergency: siteConfig.emergencyPhoneDisplay,
    email: siteConfig.email,
    address: siteConfig.address.full,
    socialLinks: [],
  };
}

export async function loadHomeHero(): Promise<HomeHeroDoc> {
  const doc = await sanityFetch<HomeHeroDoc>({ query: homeHeroQuery, tags: ["homeHero"] });
  if (doc) return doc;
  return {
    eyebrow: "Zimbabwe · 24/7 Control Centre",
    headline: siteConfig.tagline,
    subheadline:
      "Integrated protection for residential, commercial, and industrial environments — with rapid response you can trust.",
    primaryCta: { label: "Request security assessment", href: "/contact" },
    secondaryCta: { label: "Emergency response", href: `tel:${siteConfig.emergencyPhone}` },
    trustBadges: ["24/7 Monitoring", "Rapid Response Units", "Licensed Professionals"],
    slides: [],
  };
}

export async function loadServices(): Promise<ServiceDoc[]> {
  const docs = await sanityFetch<ServiceDoc[]>({ query: servicesQuery, tags: ["service"] });
  if (docs?.length) return docs;
  return [
    {
      _id: "fallback-home",
      title: "Home Security",
      slug: "home-security",
      category: "home",
      shortDescription: "Residential protection with smart integration and panic pathways.",
      features: ["Alarm systems & monitoring", "CCTV & perimeter protection", "Smart integration", "Panic response"],
    },
    {
      _id: "fallback-business",
      title: "Business Security",
      slug: "business-security",
      category: "business",
      shortDescription: "Commercial coverage with access control and transparent reporting.",
      features: ["Guarding & patrols", "Access control", "CCTV monitoring", "Risk assessments"],
    },
    {
      _id: "fallback-industrial",
      title: "Industrial Security",
      slug: "industrial-security",
      category: "industrial",
      shortDescription: "High-risk environments, logistics, and loss prevention.",
      features: ["Site guarding", "Logistics escort", "High-risk protection", "Loss prevention"],
    },
  ];
}

export async function loadControlCentreSteps(): Promise<ControlCentreStepDoc[]> {
  const docs = await sanityFetch<ControlCentreStepDoc[]>({
    query: controlCentreStepsQuery,
    tags: ["controlCentreStep"],
  });
  return docs ?? [];
}

export async function loadValueProps(): Promise<ValuePropDoc[]> {
  const docs = await sanityFetch<ValuePropDoc[]>({ query: valuePropsQuery, tags: ["valueProp"] });
  return docs ?? [];
}

export async function loadMetrics(): Promise<MetricDoc[]> {
  const docs = await sanityFetch<MetricDoc[]>({ query: metricsQuery, tags: ["metric"] });
  if (docs?.length) return docs;
  return [
    { _id: "m1", label: "Average response time", value: "< 8 min", order: 1, caveat: "Illustrative target." },
    { _id: "m2", label: "Active patrol units", value: "42", numericValue: 42, order: 2 },
    { _id: "m3", label: "Daily incidents handled", value: "120", numericValue: 120, suffix: "+", order: 3 },
  ];
}

export async function loadTestimonials(): Promise<TestimonialDoc[]> {
  const docs = await sanityFetch<TestimonialDoc[]>({ query: testimonialsQuery, tags: ["testimonial"] });
  if (docs?.length) return docs;
  return [
    {
      _id: "t1",
      quote:
        "Universe Security integrated our alarm, CCTV, and patrol response into one control view. We finally have clarity when something happens after hours.",
      authorRole: "Operations Director",
      authorOrg: "Commercial property, Harare",
      location: "Harare",
    },
  ];
}

export async function loadInsightsTeaser(): Promise<InsightTeaserDoc[]> {
  const docs = await sanityFetch<InsightTeaserDoc[]>({ query: insightsTeaserQuery, tags: ["insight"] });
  return docs ?? [];
}
