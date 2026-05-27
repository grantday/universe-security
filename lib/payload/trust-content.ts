import "server-only";

import { imageUrl } from "@/lib/image";
import { getPayloadClient } from "@/lib/payload";
import type { ClientLogo, SiteSetting } from "@/payload-types";

export type ClientLogoItem = {
  name: string;
  logoUrl: string;
};

export type CertificationItem = {
  title: string;
  body: string;
};

const DEFAULT_LOGOS: ClientLogoItem[] = [
  { name: "Retail partners", logoUrl: "" },
  { name: "Industrial sites", logoUrl: "" },
  { name: "Residential estates", logoUrl: "" },
  { name: "Banking & finance", logoUrl: "" },
  { name: "Logistics hubs", logoUrl: "" },
  { name: "Government facilities", logoUrl: "" },
  { name: "Construction groups", logoUrl: "" },
  { name: "School campuses", logoUrl: "" },
];

const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    title: "PSIRA registered",
    body: "Security service provider registration and compliant guard deployment practices.",
  },
  {
    title: "Insured operations",
    body: "Public liability and professional indemnity cover aligned to client contracts.",
  },
  {
    title: "Audit-ready reporting",
    body: "Incident logs, patrol records, and exportable reports for insurers and compliance teams.",
  },
];

export async function getClientLogos(): Promise<ClientLogoItem[]> {
  if (!process.env.PAYLOAD_SECRET) return DEFAULT_LOGOS;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "client-logos",
      where: { published: { equals: true } },
      sort: "order",
      limit: 24,
      depth: 1,
    });
    if (!result.docs.length) return DEFAULT_LOGOS;
    return result.docs.map((doc) => {
      const row = doc as ClientLogo;
      return {
        name: row.name,
        logoUrl: typeof row.logo === "object" && row.logo ? imageUrl(row.logo) : "",
      };
    });
  } catch {
    return DEFAULT_LOGOS;
  }
}

export async function getCertifications(): Promise<{
  heading: string;
  items: CertificationItem[];
}> {
  if (!process.env.PAYLOAD_SECRET) {
    return { heading: "Licensed, insured, and audit-ready", items: DEFAULT_CERTIFICATIONS };
  }
  try {
    const payload = await getPayloadClient();
    const doc = (await payload.findGlobal({ slug: "site-settings" })) as SiteSetting;
    const items = (doc.certifications ?? []).map((c) => ({
      title: c.title,
      body: c.body,
    }));
    return {
      heading: doc.certificationsHeading?.trim() || "Licensed, insured, and audit-ready",
      items: items.length ? items : DEFAULT_CERTIFICATIONS,
    };
  } catch {
    return { heading: "Licensed, insured, and audit-ready", items: DEFAULT_CERTIFICATIONS };
  }
}
