import { defaultSiteContent } from "@/lib/content/defaults";
import type { SiteContent } from "@/lib/content/schema";

/** Keep phone, email, and address in sync with lib/site-config.ts (source of truth until Payload Postgres is live). */
export function applyContactFromConfig(content: SiteContent): SiteContent {
  const contact = defaultSiteContent.site;

  const heroSlides = content.heroSlides.map((slide) => ({
    ...slide,
    ctaPrimary: slide.ctaPrimary.href.startsWith("tel:")
      ? { ...slide.ctaPrimary, href: `tel:${contact.emergencyPhone}` }
      : slide.ctaPrimary,
    ctaSecondary: slide.ctaSecondary.href.startsWith("tel:")
      ? { ...slide.ctaSecondary, href: `tel:${contact.emergencyPhone}` }
      : slide.ctaSecondary,
  }));

  return {
    ...content,
    site: {
      ...content.site,
      email: contact.email,
      salesPhone: contact.salesPhone,
      salesPhoneDisplay: contact.salesPhoneDisplay,
      emergencyPhone: contact.emergencyPhone,
      emergencyPhoneDisplay: contact.emergencyPhoneDisplay,
      addressFull: contact.addressFull,
      officeHours: contact.officeHours,
      mapEmbedUrl: contact.mapEmbedUrl ?? content.site.mapEmbedUrl,
    },
    heroSlides,
  };
}
