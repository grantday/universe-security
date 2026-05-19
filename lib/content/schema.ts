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

export const ctaSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
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
  }),
  branding: z.object({
    logoUrl: z.string().optional().or(z.literal("")),
    logoMarkText: z.string().min(1).max(2),
  }),
  heroSlides: z.array(heroSlideSchema).min(1),
  services: z.array(serviceCardSchema).min(1),
  testimonials: z.array(testimonialSchema).min(1),
  kpis: z.array(kpiSchema).min(1),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
