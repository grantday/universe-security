import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EmergencyButton } from "@/components/EmergencyButton";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <EmergencyButton />
    </>
  );
}
