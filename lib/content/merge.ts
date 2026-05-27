import { resolveLogoUrl } from "@/lib/brand";
import { defaultSiteContent } from "@/lib/content/defaults";
import { siteContentSchema, type SiteContent } from "@/lib/content/schema";

export function mergeContent(partial: Partial<SiteContent>): SiteContent {
  const merged: SiteContent = {
    ...defaultSiteContent,
    ...partial,
    site: { ...defaultSiteContent.site, ...partial.site },
    branding: {
      ...defaultSiteContent.branding,
      ...partial.branding,
      logoUrl: resolveLogoUrl(partial.branding?.logoUrl),
    },
    heroSlides: partial.heroSlides ?? defaultSiteContent.heroSlides,
    services: partial.services ?? defaultSiteContent.services,
    testimonials: partial.testimonials ?? defaultSiteContent.testimonials,
    kpis: partial.kpis ?? defaultSiteContent.kpis,
    home: {
      ...defaultSiteContent.home,
      ...partial.home,
      trustBadges: partial.home?.trustBadges ?? defaultSiteContent.home.trustBadges,
      coreServices: { ...defaultSiteContent.home.coreServices, ...partial.home?.coreServices },
      controlCentrePreview: {
        ...defaultSiteContent.home.controlCentrePreview,
        ...partial.home?.controlCentrePreview,
      },
      whyChoose: {
        ...defaultSiteContent.home.whyChoose,
        ...partial.home?.whyChoose,
        pillars: partial.home?.whyChoose?.pillars ?? defaultSiteContent.home.whyChoose.pillars,
      },
      kpisSection: { ...defaultSiteContent.home.kpisSection, ...partial.home?.kpisSection },
      testimonialsSection: {
        ...defaultSiteContent.home.testimonialsSection,
        ...partial.home?.testimonialsSection,
      },
      contactCta: { ...defaultSiteContent.home.contactCta, ...partial.home?.contactCta },
    },
    pages: {
      ...defaultSiteContent.pages,
      ...partial.pages,
      solutions: {
        ...defaultSiteContent.pages.solutions,
        ...partial.pages?.solutions,
        sections: partial.pages?.solutions?.sections ?? defaultSiteContent.pages.solutions.sections,
      },
      industries: {
        ...defaultSiteContent.pages.industries,
        ...partial.pages?.industries,
        items: partial.pages?.industries?.items ?? defaultSiteContent.pages.industries.items,
      },
      company: {
        ...defaultSiteContent.pages.company,
        ...partial.pages?.company,
        mission: { ...defaultSiteContent.pages.company.mission, ...partial.pages?.company?.mission },
        vision: { ...defaultSiteContent.pages.company.vision, ...partial.pages?.company?.vision },
        values: partial.pages?.company?.values ?? defaultSiteContent.pages.company.values,
        compliance: { ...defaultSiteContent.pages.company.compliance, ...partial.pages?.company?.compliance },
      },
      controlCentre: {
        ...defaultSiteContent.pages.controlCentre,
        ...partial.pages?.controlCentre,
        features: partial.pages?.controlCentre?.features ?? defaultSiteContent.pages.controlCentre.features,
      },
      technology: {
        ...defaultSiteContent.pages.technology,
        ...partial.pages?.technology,
        stack: partial.pages?.technology?.stack ?? defaultSiteContent.pages.technology.stack,
        dataSecurity:
          partial.pages?.technology?.dataSecurity ?? defaultSiteContent.pages.technology.dataSecurity,
      },
      contact: { ...defaultSiteContent.pages.contact, ...partial.pages?.contact },
    },
  };

  return siteContentSchema.parse(merged);
}
