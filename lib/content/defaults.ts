import { siteConfig } from "@/lib/site-config";
import type { SiteContent } from "@/lib/content/schema";

export const defaultSiteContent: SiteContent = {
  site: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    email: siteConfig.email,
    salesPhone: siteConfig.salesPhone,
    salesPhoneDisplay: siteConfig.salesPhoneDisplay,
    emergencyPhone: siteConfig.emergencyPhone,
    emergencyPhoneDisplay: siteConfig.emergencyPhoneDisplay,
    addressFull: siteConfig.address.full,
    officeHours: siteConfig.officeHours,
  },
  branding: {
    logoUrl: "",
    logoMarkText: "U",
  },
  heroSlides: [
    {
      id: "control",
      eyebrow: "Zimbabwe · 24/7 Control Centre",
      title: siteConfig.tagline,
      body: "Integrated protection for residential, commercial, and industrial environments — with rapid response you can trust.",
      theme: "controlRoom",
      seed: "home-control-room",
      imageUrl: "",
      ctaPrimary: { href: "/contact", label: "Request security assessment" },
      ctaSecondary: { href: `tel:${siteConfig.emergencyPhone}`, label: "Emergency response" },
    },
    {
      id: "guards",
      eyebrow: "Security Professionals",
      title: "Licensed guards. Visible deterrence. Clear escalation.",
      body: "Professional guarding and patrols aligned to your site's SOPs and reporting requirements.",
      theme: "guards",
      seed: "home-guards",
      imageUrl: "",
      ctaPrimary: { href: "/solutions#business", label: "Explore guarding" },
      ctaSecondary: { href: "/contact", label: "Talk to us" },
    },
    {
      id: "cctv",
      eyebrow: "Integrated Technology",
      title: "CCTV + alarms, monitored in real time.",
      body: "Unified signals, structured operator workflows, and an audit trail from alarm to resolution.",
      theme: "cctv",
      seed: "home-cctv",
      imageUrl: "",
      ctaPrimary: { href: "/technology", label: "See the technology" },
      ctaSecondary: { href: "/control-centre", label: "Control Centre" },
    },
  ],
  services: [
    {
      title: "Home Security",
      description: "Residential protection with smart integration and panic pathways.",
      theme: "residential",
      items: ["Alarm systems & monitoring", "CCTV & perimeter protection", "Smart integration", "Panic response"],
      imageUrl: "",
    },
    {
      title: "Business Security",
      description: "Commercial coverage with access control and transparent reporting.",
      theme: "business",
      items: ["Guarding & patrols", "Access control", "CCTV monitoring", "Risk assessments & asset protection"],
      imageUrl: "",
    },
    {
      title: "Industrial Security",
      description: "High-risk environments, logistics, and loss prevention.",
      theme: "industrial",
      items: ["Site guarding", "Logistics escort", "High-risk protection", "Loss prevention"],
      imageUrl: "",
    },
  ],
  testimonials: [
    {
      quote:
        "Universe Security integrated our alarm, CCTV, and patrol response into one control view. We finally have clarity when something happens after hours.",
      author: "Operations Director",
      org: "Commercial property, Harare",
    },
    {
      quote:
        "Their control room keeps us informed in real time. Response teams arrive quickly and reporting is consistent.",
      author: "Site Manager",
      org: "Industrial client, Zimbabwe",
    },
    {
      quote:
        "Professional guards, clear escalation paths, and a team that understands residential estates.",
      author: "Estate Chairperson",
      org: "Residential estate",
    },
  ],
  kpis: [
    { label: "Average response time", value: "< 8 min", note: "Illustrative target — replace with verified metric." },
    { label: "Active patrol units", value: "42", numericValue: 42 },
    { label: "Daily incidents handled", value: "120", suffix: "+", numericValue: 120 },
  ],
};
