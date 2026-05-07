import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.salesPhone,
    email: siteConfig.email,
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
    name: `${siteConfig.name} — Security services`,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityService) }}
      />
    </>
  );
}
