import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type SiteSettingsDoc = {
  companyName: string;
  tagline: string;
  phonePrimary: string;
  phoneEmergency: string;
  email: string;
  address: string;
  logo?: SanityImageSource;
  socialLinks?: { platform: string; url: string }[];
};

export type HomeHeroDoc = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  slides?: { image?: SanityImageSource; caption?: string; alt: string }[];
  trustBadges?: string[];
};

export type ServiceDoc = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  image?: SanityImageSource;
  features?: string[];
  order?: number;
};

export type ControlCentreStepDoc = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export type ValuePropDoc = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export type MetricDoc = {
  _id: string;
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  caveat?: string;
  order: number;
};

export type TestimonialDoc = {
  _id: string;
  quote: string;
  authorRole: string;
  authorOrg: string;
  location?: string;
};

export type InsightTeaserDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImageSource;
  publishedAt?: string;
  tags?: string[];
  author?: { name: string; role?: string };
};
