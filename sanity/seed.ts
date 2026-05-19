/**
 * Seed Sanity with current site content.
 * Requires SANITY_API_WRITE_TOKEN (Editor token from sanity.io/manage).
 *
 * Run: npx tsx sanity/seed.ts
 */
import { createClient } from "@sanity/client";
import { siteConfig } from "../lib/site-config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: siteConfig.name,
    tagline: siteConfig.tagline,
    phonePrimary: siteConfig.salesPhoneDisplay,
    phoneEmergency: siteConfig.emergencyPhoneDisplay,
    email: siteConfig.email,
    address: siteConfig.address.full,
    socialLinks: [],
  });

  await client.createOrReplace({
    _id: "homeHero",
    _type: "homeHero",
    eyebrow: "Zimbabwe · 24/7 Control Centre",
    headline: siteConfig.tagline,
    subheadline:
      "Integrated protection for residential, commercial, and industrial environments — with rapid response you can trust.",
    primaryCta: { label: "Request security assessment", href: "/contact" },
    secondaryCta: { label: "Emergency response", href: `tel:${siteConfig.emergencyPhone}` },
    slides: [],
    trustBadges: ["24/7 Monitoring", "Rapid Response Units", "Licensed Professionals", "Integrated Technology"],
  });

  const services = [
    {
      _id: "service-home",
      title: "Home Security",
      slug: { _type: "slug", current: "home-security" },
      category: "home",
      shortDescription: "Residential protection with smart integration and panic pathways.",
      features: ["Alarm systems & monitoring", "CCTV & perimeter protection", "Smart integration", "Panic response"],
      order: 1,
      published: true,
    },
    {
      _id: "service-business",
      title: "Business Security",
      slug: { _type: "slug", current: "business-security" },
      category: "business",
      shortDescription: "Commercial coverage with access control and transparent reporting.",
      features: ["Guarding & patrols", "Access control", "CCTV monitoring", "Risk assessments & asset protection"],
      order: 2,
      published: true,
    },
    {
      _id: "service-industrial",
      title: "Industrial Security",
      slug: { _type: "slug", current: "industrial-security" },
      category: "industrial",
      shortDescription: "High-risk environments, logistics, and loss prevention.",
      features: ["Site guarding", "Logistics escort", "High-risk protection", "Loss prevention"],
      order: 3,
      published: true,
    },
  ];

  for (const doc of services) {
    await client.createOrReplace({ ...doc, _type: "service" });
  }

  const steps = [
    { title: "Alarm received", description: "Signals validated and triaged.", icon: "Bell", order: 1 },
    { title: "Control room", description: "Operators assess live feeds and context.", icon: "Monitor", order: 2 },
    { title: "Dispatch", description: "Nearest unit assigned with SOP checklist.", icon: "Radio", order: 3 },
    { title: "Response", description: "On-site action with live status updates.", icon: "Shield", order: 4 },
    { title: "Resolution", description: "Incident closed with report and follow-up.", icon: "CheckCircle2", order: 5 },
  ];

  for (const [i, step] of steps.entries()) {
    await client.createOrReplace({
      _id: `controlCentreStep-${i + 1}`,
      _type: "controlCentreStep",
      ...step,
    });
  }

  const valueProps = [
    { title: "Integrated operations", description: "One control view across alarms, CCTV, and patrols.", icon: "Layers", order: 1 },
    { title: "Licensed professionals", description: "Trained guards with clear escalation paths.", icon: "BadgeCheck", order: 2 },
    { title: "Rapid response", description: "Structured dispatch with measurable SLAs.", icon: "Zap", order: 3 },
    { title: "Transparent reporting", description: "Incident logs and summaries you can audit.", icon: "FileText", order: 4 },
    { title: "Local expertise", description: "Coverage across Zimbabwe with regional knowledge.", icon: "MapPin", order: 5 },
  ];

  for (const [i, vp] of valueProps.entries()) {
    await client.createOrReplace({ _id: `valueProp-${i + 1}`, _type: "valueProp", ...vp });
  }

  const metrics = [
    { label: "Average response time", value: "< 8 min", caveat: "Illustrative target — replace with verified metric.", order: 1 },
    { label: "Active patrol units", value: "42", numericValue: 42, order: 2 },
    { label: "Daily incidents handled", value: "120", numericValue: 120, suffix: "+", order: 3 },
  ];

  for (const [i, m] of metrics.entries()) {
    await client.createOrReplace({ _id: `metric-${i + 1}`, _type: "metric", ...m });
  }

  const testimonials = [
    {
      quote:
        "Universe Security integrated our alarm, CCTV, and patrol response into one control view. We finally have clarity when something happens after hours.",
      authorRole: "Operations Director",
      authorOrg: "Commercial property, Harare",
      location: "Harare",
      published: true,
    },
    {
      quote:
        "Their control room keeps us informed in real time. Response teams arrive quickly and reporting is consistent.",
      authorRole: "Site Manager",
      authorOrg: "Industrial client, Zimbabwe",
      location: "Zimbabwe",
      published: true,
    },
    {
      quote:
        "Professional guards, clear escalation paths, and a team that understands residential estates.",
      authorRole: "Estate Chairperson",
      authorOrg: "Residential estate",
      location: "Zimbabwe",
      published: true,
    },
  ];

  for (const [i, t] of testimonials.entries()) {
    await client.createOrReplace({ _id: `testimonial-${i + 1}`, _type: "testimonial", ...t });
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
