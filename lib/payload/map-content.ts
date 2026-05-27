import type { SiteContent } from "@/lib/content/schema";
import { resolveLogoUrl } from "@/lib/brand";
import { imageUrl } from "@/lib/image";
import type {
  CompanyPage as CompanyPageGlobal,
  ContactPage as ContactPageGlobal,
  ControlCentrePage as ControlCentrePageGlobal,
  ControlCentreStep,
  HomePage as HomePageGlobal,
  Industry,
  Metric,
  Service,
  SiteSetting,
  SolutionsPage as SolutionsPageGlobal,
  TechnologyPage as TechnologyPageGlobal,
  Testimonial,
  ValueProp,
} from "@/payload-types";

export type ValuePropItem = SiteContent["home"]["whyChoose"]["pillars"][number] & {
  featured?: boolean;
};

export type FlowStep = {
  title: string;
  body?: string;
  icon: SiteContent["home"]["whyChoose"]["pillars"][number]["icon"];
};
function mapService(doc: Service): SiteContent["services"][number] {
  return {
    title: doc.title,
    description: doc.description,
    theme: doc.theme,
    items: (doc.items ?? []).map((item) => item.text),
    imageUrl: typeof doc.image === "object" && doc.image ? imageUrl(doc.image, "card") : "",
  };
}

function mapTestimonial(doc: Testimonial): SiteContent["testimonials"][number] {
  return {
    quote: doc.quote,
    author: doc.author,
    org: doc.org,
  };
}

function mapMetric(doc: Metric): SiteContent["kpis"][number] {
  return {
    label: doc.label,
    value: doc.value,
    suffix: doc.suffix ?? undefined,
    prefix: doc.prefix ?? undefined,
    note: doc.note ?? undefined,
    numericValue: doc.numericValue ?? undefined,
  };
}

function mapValueProp(doc: ValueProp): ValuePropItem {
  return {
    title: doc.title,
    body: doc.body,
    icon: doc.icon,
    featured: doc.featured ?? false,
  };
}
export function mapSiteSettings(settings: SiteSetting): Pick<SiteContent, "site" | "branding"> {
  return {
    site: {
      name: settings.name,
      tagline: settings.tagline,
      description: settings.description,
      email: settings.email,
      salesPhone: settings.salesPhone,
      salesPhoneDisplay: settings.salesPhoneDisplay,
      emergencyPhone: settings.emergencyPhone,
      emergencyPhoneDisplay: settings.emergencyPhoneDisplay,
      addressFull: settings.addressFull,
      officeHours: settings.officeHours,
    },
    branding: {
      logoUrl: resolveLogoUrl(
        typeof settings.logo === "object" && settings.logo ? imageUrl(settings.logo) : "",
      ),
      logoMarkText: settings.logoMarkText ?? "U",
    },
  };
}

export function mapHomePageGlobal(home: HomePageGlobal): Pick<SiteContent, "heroSlides" | "home"> {
  return {
    heroSlides: (home.heroSlides ?? []).map((slide) => ({
      id: slide.id,
      eyebrow: slide.eyebrow,
      title: slide.title,
      body: slide.body,
      theme: slide.theme,
      seed: slide.seed,
      imageUrl:
        (slide as { imageUrl?: string | null }).imageUrl?.trim() ||
        (typeof slide.image === "object" && slide.image ? imageUrl(slide.image, "hero") : ""),
      ctaPrimary: slide.ctaPrimary,
      ctaSecondary: slide.ctaSecondary,
    })),
    home: {
      trustBadges: home.trustBadges ?? [],
      coreServices: home.coreServices,
      controlCentrePreview: home.controlCentrePreview,
      whyChoose: {
        heading: home.whyChoose.heading,
        intro: home.whyChoose.intro,
        pillars: [],
      },
      kpisSection: home.kpisSection,
      testimonialsSection: home.testimonialsSection,
      contactCta: home.contactCta,
    },
  };
}

export function mapIndustries(
  docs: Industry[],
  header?: { title?: string | null; intro?: string | null },
): SiteContent["pages"]["industries"] & {
  items: Array<SiteContent["pages"]["industries"]["items"][number] & { imageUrl?: string }>;
} {
  return {
    title: header?.title?.trim() || "Industries",
    intro:
      header?.intro?.trim() ||
      "Sector-specific playbooks backed by our 24/7 control centre and licensed response teams.",
    items: docs.map((doc) => ({
      title: doc.title,
      blurb: doc.blurb,
      icon: doc.icon,
      imageUrl: typeof doc.image === "object" && doc.image ? imageUrl(doc.image, "card") : "",
    })),
  };
}

export function mapSolutionsPage(
  page: SolutionsPageGlobal,
  services: Service[],
): SiteContent["pages"]["solutions"] {
  const order = ["home", "business", "industrial", "specialised"] as const;
  const sections = order
    .map((id) => {
      const svc = services.find((s) => s.category === id);
      if (!svc) return null;
      return {
        id,
        title: svc.title,
        lead: svc.description,
        items: (svc.items ?? []).map((item) => item.text),
      };
    })
    .filter((s): s is NonNullable<typeof s> => s != null);

  return {
    title: page.title,
    intro: page.intro,
    sections: sections.length ? sections : [],
  };
}

export function mapControlCentrePage(page: ControlCentrePageGlobal): SiteContent["pages"]["controlCentre"] {
  return {
    heroTitle: page.heroTitle,
    heroIntro: page.heroIntro,
    features: (page.features ?? []).map((f) => ({
      title: f.title,
      body: f.body,
      icon: f.icon,
    })),
    ctaLabel: page.ctaLabel,
    ctaHref: page.ctaHref,
  };
}

export function mapCompanyPage(page: CompanyPageGlobal): SiteContent["pages"]["company"] {
  return {
    title: page.title,
    mission: {
      eyebrow: page.mission.eyebrow ?? undefined,
      title: page.mission.title,
      body: page.mission.body,
    },
    vision: {
      eyebrow: page.vision.eyebrow ?? undefined,
      title: page.vision.title,
      body: page.vision.body,
    },
    valuesHeading: page.valuesHeading,
    values: (page.values ?? []).map((v) => ({
      title: v.title,
      body: v.body,
      icon: v.icon,
    })),
    compliance: page.compliance,
  };
}

export function mapTechnologyPage(page: TechnologyPageGlobal): SiteContent["pages"]["technology"] {
  return {
    title: page.title,
    intro: page.intro,
    stack: (page.stack ?? []).map((item) => ({
      title: item.title,
      body: item.body,
      icon: item.icon,
      badge: item.badge ?? undefined,
    })),
    dataSecurityHeading: page.dataSecurityHeading,
    dataSecurity: (page.dataSecurity ?? []).map((d) => ({
      title: d.title,
      body: d.body,
      icon: d.icon,
    })),
    ctaLabel: page.ctaLabel,
    ctaHref: page.ctaHref,
  };
}

export function mapContactPage(page: ContactPageGlobal): SiteContent["pages"]["contact"] {
  return {
    title: page.title,
    intro: page.intro,
    formHeading: page.formHeading,
    formIntro: page.formIntro,
    emergencyHeading: page.emergencyHeading,
    emergencyNote: page.emergencyNote,
    officeHeading: page.officeHeading,
  };
}

export function mapControlCentreSteps(docs: ControlCentreStep[]): FlowStep[] {
  return docs.map((doc) => ({
    title: doc.title,
    body: doc.body,
    icon: doc.icon,
  }));
}
export { mapService, mapTestimonial, mapMetric, mapValueProp };
