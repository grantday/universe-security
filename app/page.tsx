import { HomeHeroSlider } from "@/components/home/HomeHeroSlider";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CoreServices } from "@/components/home/CoreServices";
import { ControlCentrePreview } from "@/components/home/ControlCentrePreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { KpiSection } from "@/components/home/KpiSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCta } from "@/components/home/ContactCta";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Intelligent security for Zimbabwe",
  description:
    "Universe Security — integrated residential, commercial, and industrial protection with 24/7 control centre monitoring and rapid response.",
};

export default function HomePage() {
  return (
    <>
      <HomeHeroSlider />
      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>
      <ScrollReveal>
        <CoreServices />
      </ScrollReveal>
      <ScrollReveal>
        <ControlCentrePreview />
      </ScrollReveal>
      <ScrollReveal>
        <WhyChoose />
      </ScrollReveal>
      <ScrollReveal>
        <KpiSection />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCta />
      </ScrollReveal>
    </>
  );
}
