import { z } from "zod";

export const imageThemeSchema = z.enum([
  "guards",
  "cctv",
  "controlRoom",
  "dispatch",
  "response",
  "accessControl",
  "industrial",
  "residential",
  "business",
  "events",
  "schools",
  "government",
  "logistics",
]);

export const iconKeySchema = z.enum([
  "clock",
  "radio",
  "shieldCheck",
  "mapPin",
  "users",
  "cpu",
  "shield",
  "headphones",
  "zap",
  "barChart3",
  "building2",
  "shoppingBag",
  "landmark",
  "hardHat",
  "truck",
  "school",
  "warehouse",
  "partyPopper",
  "activity",
  "shieldAlert",
  "scrollText",
  "camera",
  "mapPinned",
  "smartphone",
  "fileWarning",
  "lock",
  "keyRound",
  "clipboardList",
  "scale",
  "target",
  "heartHandshake",
  "lightbulb",
  "home",
  "factory",
  "check",
]);

export const ctaSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const sectionHeaderSchema = z.object({
  heading: z.string().min(1),
  intro: z.string().min(1),
});

export const heroSlideSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  theme: imageThemeSchema,
  seed: z.string().min(1),
  imageUrl: z.string().optional().or(z.literal("")),
  ctaPrimary: ctaSchema,
  ctaSecondary: ctaSchema,
});

export const serviceCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  theme: imageThemeSchema,
  items: z.array(z.string()).min(1),
  imageUrl: z.string().optional().or(z.literal("")),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  org: z.string().min(1),
});

export const kpiSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  note: z.string().optional(),
  numericValue: z.number().optional(),
});

export const trustBadgeSchema = z.object({
  icon: iconKeySchema,
  label: z.string().min(1),
});

export const pillarSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  icon: iconKeySchema,
});

export const pageSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  lead: z.string().min(1),
  items: z.array(z.string()).min(1),
});

export const industryItemSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  icon: iconKeySchema,
});

export const featureBlockSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  icon: iconKeySchema,
  badge: z.string().optional(),
});

export const textBlockSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const homeContentSchema = z.object({
  trustBadges: z.array(trustBadgeSchema).min(1),
  coreServices: sectionHeaderSchema,
  controlCentrePreview: sectionHeaderSchema.extend({
    ctaHref: z.string().min(1),
    ctaLabel: z.string().min(1),
  }),
  whyChoose: sectionHeaderSchema.extend({
    pillars: z.array(pillarSchema).min(1),
  }),
  kpisSection: sectionHeaderSchema,
  testimonialsSection: sectionHeaderSchema,
  contactCta: sectionHeaderSchema.extend({
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
  }),
});

export const pagesContentSchema = z.object({
  solutions: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    sections: z.array(pageSectionSchema).min(1),
  }),
  industries: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    items: z.array(industryItemSchema).min(1),
  }),
  company: z.object({
    title: z.string().min(1),
    mission: textBlockSchema,
    vision: textBlockSchema,
    valuesHeading: z.string().min(1),
    values: z.array(pillarSchema).min(1),
    compliance: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
    }),
  }),
  controlCentre: z.object({
    heroTitle: z.string().min(1),
    heroIntro: z.string().min(1),
    features: z.array(featureBlockSchema).min(1),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().min(1),
  }),
  technology: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    stack: z.array(featureBlockSchema).min(1),
    dataSecurityHeading: z.string().min(1),
    dataSecurity: z.array(featureBlockSchema).min(1),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().min(1),
  }),
  contact: z.object({
    title: z.string().min(1),
    intro: z.string().min(1),
    formHeading: z.string().min(1),
    formIntro: z.string().min(1),
    emergencyHeading: z.string().min(1),
    emergencyNote: z.string().min(1),
    officeHeading: z.string().min(1),
  }),
});

export const siteContentSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    email: z.string().email(),
    salesPhone: z.string().min(1),
    salesPhoneDisplay: z.string().min(1),
    emergencyPhone: z.string().min(1),
    emergencyPhoneDisplay: z.string().min(1),
    addressFull: z.string().min(1),
    officeHours: z.string().min(1),
    mapEmbedUrl: z.string().optional().or(z.literal("")),
  }),
  branding: z.object({
    logoUrl: z.string().optional().or(z.literal("")),
    logoMarkText: z.string().min(1).max(2),
  }),
  heroSlides: z.array(heroSlideSchema).min(1),
  services: z.array(serviceCardSchema).min(1),
  testimonials: z.array(testimonialSchema).min(1),
  kpis: z.array(kpiSchema).min(1),
  home: homeContentSchema,
  pages: pagesContentSchema,
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export type ServiceCard = z.infer<typeof serviceCardSchema>;
export type IconKey = z.infer<typeof iconKeySchema>;
export type ImageTheme = z.infer<typeof imageThemeSchema>;
