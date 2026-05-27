import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { getPayload } from "payload";

import config from "@payload-config";
import type { SiteContent } from "@/lib/content/schema";
import { textToLexical } from "@/lib/payload/lexical";

const contentPath = path.join(process.cwd(), "content/site-content.json");
const insightsDir = path.join(process.cwd(), "content/insights");

const email = process.env.PAYLOAD_ADMIN_EMAIL || "admin@universe-security.local";
const password = process.env.PAYLOAD_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "changeme-local-dev";

const flowSteps = [
  { title: "Alarm", body: "Intrusion or panic signal received and prioritised.", icon: "radio" as const },
  { title: "Control Room", body: "Operator validates the event and opens an incident.", icon: "building2" as const },
  { title: "Dispatch", body: "Nearest response unit is assigned with GPS routing.", icon: "radio" as const },
  { title: "Response", body: "On-site team secures the location and reports back.", icon: "truck" as const },
  { title: "Resolution", body: "Incident closed with client notification and audit log.", icon: "check" as const },
];

function loadDefaults(): SiteContent {
  const raw = readFileSync(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

async function upsertByField(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: Parameters<Awaited<ReturnType<typeof getPayload>>["find"]>[0]["collection"],
  field: string,
  value: string,
  data: Record<string, unknown>,
) {
  const found = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
  });
  if (found.docs[0]) {
    await payload.update({ collection, id: found.docs[0].id, data });
  } else {
    await payload.create({ collection, data });
  }
}

export async function runPayloadSeed(): Promise<{ ok: true; message: string }> {
  const payload = await getPayload({ config });
  const defaults = loadDefaults();

  const existingUsers = await payload.find({ collection: "users", limit: 1 });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email, password },
    });
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: defaults.site.name,
      tagline: defaults.site.tagline,
      description: defaults.site.description,
      email: defaults.site.email,
      officeHours: defaults.site.officeHours,
      salesPhone: defaults.site.salesPhone,
      salesPhoneDisplay: defaults.site.salesPhoneDisplay,
      emergencyPhone: defaults.site.emergencyPhone,
      emergencyPhoneDisplay: defaults.site.emergencyPhoneDisplay,
      addressFull: defaults.site.addressFull,
      logoMarkText: defaults.branding.logoMarkText,
      seoDescription:
        "Universe Security — 24/7 guarding, CCTV, access control, and control-room monitoring across Harare and Zimbabwe.",
      certificationsHeading: "Licensed, insured, and audit-ready",
      certifications: [
        { title: "PSIRA registered", body: "Guarding and response services under national private security regulation." },
        { title: "ISO-aligned operations", body: "Documented SOPs, incident logs, and client reporting." },
        { title: "Fully insured", body: "Public liability and professional indemnity for deployed teams." },
      ],
    },
  });

  const clientLogos = [
    "Logistics & warehousing",
    "Retail & malls",
    "Residential estates",
    "Healthcare facilities",
    "Corporate campuses",
    "Events & venues",
  ];
  let logoOrder = 0;
  for (const name of clientLogos) {
    await upsertByField(payload, "client-logos", "name", name, {
      name,
      published: true,
      order: logoOrder++,
    });
  }

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      heroSlides: defaults.heroSlides.map(({ imageUrl: _imageUrl, ...slide }) => slide),
      trustBadges: defaults.home.trustBadges,
      coreServices: defaults.home.coreServices,
      controlCentrePreview: defaults.home.controlCentrePreview,
      whyChoose: {
        heading: defaults.home.whyChoose.heading,
        intro: defaults.home.whyChoose.intro,
      },
      kpisSection: defaults.home.kpisSection,
      testimonialsSection: defaults.home.testimonialsSection,
      contactCta: defaults.home.contactCta,
    },
  });

  const solutions = defaults.pages.solutions;
  await payload.updateGlobal({
    slug: "solutions-page",
    data: {
      title: solutions.title,
      intro: solutions.intro,
      footerHeading: "Need a blended programme?",
      footerIntro: "We design multi-site coverage with one control-room view.",
      footerCtaLabel: "Speak to our team",
      footerCtaHref: "/contact",
    },
  });

  const cc = defaults.pages.controlCentre;
  await payload.updateGlobal({
    slug: "control-centre-page",
    data: {
      heroTitle: cc.heroTitle,
      heroIntro: cc.heroIntro,
      features: cc.features,
      ctaLabel: cc.ctaLabel,
      ctaHref: cc.ctaHref,
    },
  });

  await payload.updateGlobal({ slug: "company-page", data: defaults.pages.company });
  await payload.updateGlobal({ slug: "technology-page", data: defaults.pages.technology });
  await payload.updateGlobal({ slug: "contact-page", data: defaults.pages.contact });

  let order = 0;
  for (const section of solutions.sections) {
    const slug = section.id;
    const theme =
      section.id === "home"
        ? "residential"
        : section.id === "business"
          ? "business"
          : section.id === "industrial"
            ? "industrial"
            : "events";
    await upsertByField(payload, "services", "slug", slug, {
      title: section.title,
      slug,
      category: section.id,
      description: section.lead,
      theme,
      items: section.items.map((text) => ({ text })),
      published: true,
      order: order++,
    });
  }

  order = 0;
  for (const testimonial of defaults.testimonials) {
    await upsertByField(payload, "testimonials", "author", testimonial.author, {
      ...testimonial,
      published: true,
      order: order++,
    });
  }

  order = 0;
  for (const kpi of defaults.kpis) {
    await upsertByField(payload, "metrics", "label", kpi.label, {
      ...kpi,
      published: true,
      order: order++,
    });
  }

  order = 0;
  for (const pillar of defaults.home.whyChoose.pillars) {
    await upsertByField(payload, "value-props", "title", pillar.title, {
      title: pillar.title,
      body: pillar.body,
      icon: pillar.icon,
      featured: order === 0,
      published: true,
      order: order++,
    });
  }

  const industriesPage = defaults.pages.industries;
  await payload.updateGlobal({
    slug: "industries-page",
    data: {
      title: industriesPage.title,
      intro: industriesPage.intro,
    },
  });

  order = 0;
  for (const item of defaults.pages.industries.items) {
    await upsertByField(payload, "industries", "title", item.title, {
      ...item,
      published: true,
      order: order++,
    });
  }

  order = 0;
  for (const step of flowSteps) {
    await upsertByField(payload, "control-centre-steps", "title", step.title, {
      ...step,
      published: true,
      order: order++,
    });
  }

  if (existsSync(insightsDir)) {
    const mdxFiles = readdirSync(insightsDir).filter((f) => f.endsWith(".mdx"));
    for (const file of mdxFiles) {
      const slug = file.replace(/\.mdx$/, "");
      const raw = readFileSync(path.join(insightsDir, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as { title: string; date: string; description: string };
      const isCaseStudy = slug.includes("case-study");
      await upsertByField(payload, "insights", "slug", slug, {
        title: fm.title,
        slug,
        excerpt: fm.description,
        content: textToLexical(content.trim()),
        published: true,
        publishedAt: fm.date,
        contentType: isCaseStudy ? "case-study" : "article",
        ...(isCaseStudy
          ? {
              caseStudy: {
                problem:
                  "Multi-gate logistics hub with high vehicle throughput needed consistent perimeter control and faster incident acknowledgement.",
                approach:
                  "Integrated CCTV analytics, manned gates, and control-room escalation with GPS-tracked response units and client SLA reporting.",
                metrics: [
                  { label: "Average acknowledgement", value: "Under 2 min" },
                  { label: "On-site response (urban)", value: "8–12 min" },
                  { label: "Repeat perimeter breaches", value: "Reduced 40%" },
                ],
              },
            }
          : {}),
      });
    }
  }

  return { ok: true, message: "Payload seed complete (globals, services, steps, insights, trust content)." };
}
