"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
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
      <Nav />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <EmergencyButton />
    </>
  );
}
