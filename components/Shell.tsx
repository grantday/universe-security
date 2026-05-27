"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyButton } from "@/components/EmergencyButton";
import { WhatsAppChatButton } from "@/components/WhatsAppChatButton";
import type { BrandingInfo, SiteInfo } from "@/lib/content/site-types";

type Props = {
  children: React.ReactNode;
  site: SiteInfo;
  branding: BrandingInfo;
};

export function Shell({ children, site, branding }: Props) {
  const pathname = usePathname();
  const isBare =
    pathname?.startsWith("/cms-admin") || pathname?.startsWith("/studio");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader site={site} branding={branding} />
      <main className="min-h-screen pt-[68px]">{children}</main>
      <Footer site={site} branding={branding} />
      <WhatsAppChatButton site={site} />
      <EmergencyButton site={site} />
    </>
  );
}
