"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyButton } from "@/components/EmergencyButton";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = pathname?.startsWith("/admin") || pathname?.startsWith("/studio");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-[68px]">{children}</main>
      <Footer />
      <EmergencyButton />
    </>
  );
}
