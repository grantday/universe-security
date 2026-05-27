import type { Metadata } from "next";
import type { SiteSeoConfig } from "@/lib/seo/site-seo";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  ogImageUrl?: string | null;
  noIndex?: boolean;
};

export function buildRootMetadata(seo: SiteSeoConfig): Metadata {
  const images = seo.ogImageUrl
    ? [{ url: seo.ogImageUrl, width: 1200, height: 630, alt: seo.siteName }]
    : undefined;

  return {
    metadataBase: seo.metadataBase,
    title: {
      default: seo.title,
      template: `%s | ${seo.siteName}`,
    },
    description: seo.metaDescription,
    alternates: {
      canonical: seo.siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_ZW",
      url: seo.siteUrl,
      siteName: seo.siteName,
      title: seo.socialTitle || seo.siteName,
      description: seo.metaDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.socialTitle || seo.siteName,
      description: seo.metaDescription,
      images: seo.ogImageUrl ? [seo.ogImageUrl] : undefined,
      ...(seo.twitterHandle ? { site: `@${seo.twitterHandle}`, creator: `@${seo.twitterHandle}` } : {}),
    },
    robots: seo.robotsNoIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function buildPageMetadata(seo: SiteSeoConfig, page: PageMetaInput): Metadata {
  const canonical = page.path ? new URL(page.path, seo.metadataBase).toString() : undefined;
  const image = page.ogImageUrl ?? seo.ogImageUrl;

  return {
    title: page.title,
    description: page.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      images: image ? [{ url: image, alt: page.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: image ? [image] : undefined,
    },
    robots: page.noIndex ? { index: false, follow: false } : undefined,
  };
}
