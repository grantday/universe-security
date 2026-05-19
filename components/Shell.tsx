"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EmergencyButton } from "@/components/EmergencyButton";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
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
