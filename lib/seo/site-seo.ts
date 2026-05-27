import "server-only";

import { cache } from "react";
import { imageUrl } from "@/lib/image";
import { getPublicSiteUrl, getMetadataBaseUrl } from "@/lib/public-site-url";
import { canUsePayloadDatabase } from "@/lib/payload/database";
import { getPayloadClient } from "@/lib/payload";
import type { SiteSetting } from "@/payload-types";

export type SiteSeoConfig = {
  siteName: string;
  tagline: string;
  description: string;
  /** Default document title */
  title: string;
  /** Optional OG/Twitter title override */
  socialTitle: string | null;
  metaDescription: string;
  siteUrl: string;
  metadataBase: URL;
  usingFallbackUrl: boolean;
  ogImageUrl: string | null;
  twitterHandle: string | null;
  robotsNoIndex: boolean;
  logoUrl: string | null;
};

const FALLBACK_HOST = "universe-security.example.com";

function mapSeo(doc: SiteSetting): SiteSeoConfig {
  const siteUrl = getPublicSiteUrl();
  const usingFallbackUrl = siteUrl.includes(FALLBACK_HOST);
  const metaDescription = (doc.seoDescription?.trim() || doc.description).trim();
  const socialTitle = doc.seoTitle?.trim() || null;
  const title = socialTitle ? `${socialTitle} | ${doc.name}` : `${doc.name} — ${doc.tagline}`;

  let ogImageUrl: string | null = null;
  if (typeof doc.ogImage === "object" && doc.ogImage) {
    ogImageUrl = imageUrl(doc.ogImage, "hero");
  }

  let logoUrl: string | null = null;
  if (typeof doc.logo === "object" && doc.logo) {
    logoUrl = imageUrl(doc.logo);
  }

  return {
    siteName: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    title,
    socialTitle,
    metaDescription,
    siteUrl,
    metadataBase: getMetadataBaseUrl(),
    usingFallbackUrl,
    ogImageUrl,
    twitterHandle: doc.twitterHandle?.trim() || null,
    robotsNoIndex: Boolean(doc.robotsNoIndex),
    logoUrl,
  };
}

export const getSiteSeoConfig = cache(async (): Promise<SiteSeoConfig | null> => {
  if (!canUsePayloadDatabase()) return null;
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "site-settings", depth: 2 })) as SiteSetting;
    return mapSeo(doc);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getSiteSeoConfig]", err);
    }
    return null;
  }
});
