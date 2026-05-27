import "server-only";

import { revalidatePath } from "next/cache";
import { imageUrl } from "@/lib/image";
import { getPayloadClient } from "@/lib/payload";
import type { SiteSetting } from "@/payload-types";

export type StudioSiteSettings = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  officeHours: string;
  salesPhone: string;
  salesPhoneDisplay: string;
  emergencyPhone: string;
  emergencyPhoneDisplay: string;
  addressFull: string;
  mapEmbedUrl: string;
  logoMarkText: string;
  logoUrl: string;
  logoId: number | null;
  seoTitle: string;
  seoDescription: string;
  ogImageId: number | null;
  ogImageUrl: string;
  twitterHandle: string;
  robotsNoIndex: boolean;
  certificationsHeading: string;
  certifications: { title: string; body: string }[];
};

function mapSettings(doc: SiteSetting): StudioSiteSettings {
  let logoId: number | null = null;
  let logoUrl = "";
  if (typeof doc.logo === "object" && doc.logo) {
    logoId = doc.logo.id;
    logoUrl = imageUrl(doc.logo);
  } else if (typeof doc.logo === "number") {
    logoId = doc.logo;
  }
  let ogImageId: number | null = null;
  let ogImageUrl = "";
  if (typeof doc.ogImage === "object" && doc.ogImage) {
    ogImageId = doc.ogImage.id;
    ogImageUrl = imageUrl(doc.ogImage, "hero");
  } else if (typeof doc.ogImage === "number") {
    ogImageId = doc.ogImage;
  }

  return {
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    email: doc.email,
    officeHours: doc.officeHours,
    salesPhone: doc.salesPhone,
    salesPhoneDisplay: doc.salesPhoneDisplay,
    emergencyPhone: doc.emergencyPhone,
    emergencyPhoneDisplay: doc.emergencyPhoneDisplay,
    addressFull: doc.addressFull,
    mapEmbedUrl: doc.mapEmbedUrl?.trim() ?? "",
    logoMarkText: doc.logoMarkText ?? "U",
    logoUrl,
    logoId,
    seoTitle: doc.seoTitle?.trim() ?? "",
    seoDescription: doc.seoDescription?.trim() ?? "",
    ogImageId,
    ogImageUrl,
    twitterHandle: doc.twitterHandle?.trim() ?? "",
    robotsNoIndex: Boolean(doc.robotsNoIndex),
    certificationsHeading: doc.certificationsHeading?.trim() ?? "Licensed, insured, and audit-ready",
    certifications: (doc.certifications ?? []).map((c) => ({ title: c.title, body: c.body })),
  };
}

export async function getStudioSiteSettings() {
  const payload = await getPayloadClient();
  const doc = (await payload.findGlobal({ slug: "site-settings", depth: 2 })) as SiteSetting;
  return { settings: mapSettings(doc), updatedAt: doc.updatedAt ?? null };
}

export async function saveStudioSiteSettings(settings: StudioSiteSettings) {
  const payload = await getPayloadClient();
  const doc = (await payload.findGlobal({ slug: "site-settings", depth: 0 })) as SiteSetting;
  const { id: _id, updatedAt: _u, createdAt: _c, ...rest } = doc;

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      ...rest,
      name: settings.name,
      tagline: settings.tagline,
      description: settings.description,
      email: settings.email,
      officeHours: settings.officeHours,
      salesPhone: settings.salesPhone,
      salesPhoneDisplay: settings.salesPhoneDisplay,
      emergencyPhone: settings.emergencyPhone,
      emergencyPhoneDisplay: settings.emergencyPhoneDisplay,
      addressFull: settings.addressFull,
      mapEmbedUrl: settings.mapEmbedUrl || undefined,
      logoMarkText: settings.logoMarkText,
      logo: settings.logoId ?? undefined,
      seoTitle: settings.seoTitle || undefined,
      seoDescription: settings.seoDescription || undefined,
      ogImage: settings.ogImageId ?? undefined,
      twitterHandle: settings.twitterHandle || undefined,
      robotsNoIndex: settings.robotsNoIndex,
      certificationsHeading: settings.certificationsHeading || undefined,
      certifications: settings.certifications,
    },
  });

  const paths = ["/", "/solutions", "/industries", "/company", "/control-centre", "/technology", "/contact", "/insights"];
  revalidatePath("/sitemap.xml");
  for (const p of paths) {
    revalidatePath(p, "layout");
  }
  return getStudioSiteSettings();
}
