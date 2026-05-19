import { siteConfig } from "@/lib/site-config";
import type { SiteInfo } from "@/lib/content/site-types";

export function JsonLd({ site }: { site: SiteInfo }) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: siteConfig.url,
    telephone: site.salesPhone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    areaServed: { "@type": "Country", name: "Zimbabwe" },
    priceRange: "$$",
  };

  const securityService = {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: `${site.name} — Security services`,
    provider: { "@type": "Organization", name: site.name, url: siteConfig.url },
    areaServed: "Zimbabwe",
    serviceType: [
      "Residential security",
      "Commercial guarding",
      "Industrial site security",
      "CCTV and alarm monitoring",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(securityService) }} />
    </>
  );
}
