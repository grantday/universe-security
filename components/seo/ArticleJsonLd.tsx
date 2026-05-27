import { getPublicSiteUrl } from "@/lib/public-site-url";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";

export async function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) {
  const seo = await getSiteSeoConfig();
  const base = getPublicSiteUrl().replace(/\/$/, "");
  const url = `${base}/insights/${slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Organization",
      name: seo?.siteName ?? "Universe Security",
    },
    publisher: {
      "@type": "Organization",
      name: seo?.siteName ?? "Universe Security",
      logo: seo?.logoUrl
        ? { "@type": "ImageObject", url: new URL(seo.logoUrl, base).toString() }
        : undefined,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
  );
}
