import { getPublicSiteUrl } from "@/lib/public-site-url";
import type { SiteInfo } from "@/lib/content/site-types";
import { siteConfig } from "@/lib/site-config";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";
import { resolveLogoUrl } from "@/lib/brand";

export async function JsonLd({ site }: { site: SiteInfo }) {
  const seo = await getSiteSeoConfig();
  const siteUrl = getPublicSiteUrl();
  const logoUrl = seo?.logoUrl ?? resolveLogoUrl(null);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: new URL(logoUrl, siteUrl).toString(),
    email: site.email,
    telephone: site.salesPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: seo?.metaDescription ?? site.description,
    url: siteUrl,
    image: seo?.ogImageUrl ?? logoUrl,
    telephone: site.salesPhone,
    email: site.email,
    address: organization.address,
    areaServed: { "@type": "Country", name: "Zimbabwe" },
    priceRange: "$$",
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: seo?.metaDescription ?? site.description,
    publisher: { "@type": "Organization", name: site.name },
    inLanguage: "en-ZW",
  };

  const securityService = {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: `${site.name} — Security services`,
    provider: { "@type": "Organization", name: site.name, url: siteUrl },
    areaServed: "Zimbabwe",
    serviceType: [
      "Residential security",
      "Commercial guarding",
      "Industrial site security",
      "CCTV and alarm monitoring",
    ],
  };

  const graphs = [organization, localBusiness, webSite, securityService];

  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
