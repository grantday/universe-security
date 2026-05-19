import type { SiteContent } from "@/lib/content/schema";

/** Strip to digits and leading + for tel: links */
export function phoneToTel(display: string): string {
  const digits = display.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("0")) return `+263${digits.slice(1)}`;
  return digits ? `+${digits}` : display;
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  const salesPhone = phoneToTel(content.site.salesPhoneDisplay);
  const emergencyPhone = phoneToTel(content.site.emergencyPhoneDisplay);

  return {
    ...content,
    site: {
      ...content.site,
      salesPhone,
      emergencyPhone,
    },
    heroSlides: content.heroSlides.map((slide) => ({
      ...slide,
      ctaPrimary: slide.ctaPrimary.href.startsWith("tel:")
        ? { ...slide.ctaPrimary, href: `tel:${emergencyPhone}` }
        : slide.ctaPrimary,
      ctaSecondary: slide.ctaSecondary.href.startsWith("tel:")
        ? { ...slide.ctaSecondary, href: `tel:${emergencyPhone}` }
        : slide.ctaSecondary,
    })),
  };
}

export function formatValidationErrors(details: unknown): string {
  if (!details || typeof details !== "object") return "Validation failed.";
  const d = details as { fieldErrors?: Record<string, string[]>; formErrors?: string[] };
  const lines: string[] = [];
  if (d.formErrors?.length) lines.push(...d.formErrors);
  if (d.fieldErrors) {
    for (const [field, msgs] of Object.entries(d.fieldErrors)) {
      if (msgs?.length) lines.push(`${field}: ${msgs.join(", ")}`);
    }
  }
  return lines.length ? lines.join(" · ") : "Validation failed.";
}
