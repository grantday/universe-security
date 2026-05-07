import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CoreServices } from "@/components/home/CoreServices";
import { ControlCentrePreview } from "@/components/home/ControlCentrePreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { KpiSection } from "@/components/home/KpiSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCta } from "@/components/home/ContactCta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligent security for Zimbabwe",
  description:
    "Universe Security — integrated residential, commercial, and industrial protection with 24/7 control centre monitoring and rapid response.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CoreServices />
      <ControlCentrePreview />
      <WhyChoose />
      <KpiSection />
      <TestimonialsSection />
      <ContactCta />
    </>
  );
}
