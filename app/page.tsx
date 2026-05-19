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
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Intelligent security for Zimbabwe",
  description:
    "Universe Security — integrated residential, commercial, and industrial protection with 24/7 control centre monitoring and rapid response.",
};

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <HomeHeroSlider slides={content.heroSlides} />
      <ScrollReveal>
        <TrustStrip badges={content.home.trustBadges} />
      </ScrollReveal>
      <ScrollReveal>
        <CoreServices header={content.home.coreServices} services={content.services} />
      </ScrollReveal>
      <ScrollReveal>
        <ControlCentrePreview section={content.home.controlCentrePreview} />
      </ScrollReveal>
      <ScrollReveal>
        <WhyChoose section={content.home.whyChoose} />
      </ScrollReveal>
      <ScrollReveal>
        <KpiSection header={content.home.kpisSection} kpis={content.kpis} />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection section={content.home.testimonialsSection} testimonials={content.testimonials} />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCta section={content.home.contactCta} site={content.site} />
      </ScrollReveal>
    </>
  );
}
