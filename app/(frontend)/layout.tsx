import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Shell } from "@/components/Shell";
import { JsonLd } from "@/components/JsonLd";
import { getContent } from "@/lib/content/get";
import { buildRootMetadata } from "@/lib/seo/metadata";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";
import { getPublicSiteUrl } from "@/lib/public-site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B2545",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSeoConfig();
  if (seo) return buildRootMetadata(seo);

  const content = await getContent();
  const { site } = content;
  const base = getPublicSiteUrl();
  return {
    metadataBase: new URL(base),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans">
        {await JsonLd({ site: content.site })}
        <Shell site={content.site} branding={content.branding}>
          {children}
        </Shell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
