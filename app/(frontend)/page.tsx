import { HomeHeroSlider } from "@/components/home/HomeHeroSlider";
import { TrustStrip } from "@/components/home/TrustStrip";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { CoreServices } from "@/components/home/CoreServices";
import { ControlCentrePreview } from "@/components/home/ControlCentrePreview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { KpiSection } from "@/components/home/KpiSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { ContactCta } from "@/components/home/ContactCta";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getContent } from "@/lib/content/get";
import { getControlCentreSteps } from "@/lib/payload/queries";
import { listInsights } from "@/lib/insights";
import { getClientLogos, getCertifications } from "@/lib/payload/trust-content";
import { ComplianceStrip } from "@/components/trust/ComplianceStrip";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSeoConfig();
  if (!seo) {
    return {
      title: "Intelligent security for Zimbabwe",
      description:
        "Universe Security — integrated residential, commercial, and industrial protection with 24/7 control centre monitoring and rapid response.",
    };
  }
  return buildPageMetadata(seo, {
    title: "Intelligent security for Zimbabwe",
    description:
      "Integrated residential, commercial, and industrial protection with 24/7 control centre monitoring and rapid response.",
    path: "/",
  });
}

export default async function HomePage() {
  const [content, steps, insightsResult, logos, certifications] = await Promise.all([
    getContent(),
    getControlCentreSteps(),
    listInsights(1, 3),
    getClientLogos(),
    getCertifications(),
  ]);
  const insights = insightsResult.items;

  return (
    <>
      <HomeHeroSlider slides={content.heroSlides} />
      <ScrollReveal>
        <TrustStrip badges={content.home.trustBadges} />
      </ScrollReveal>
      <LogoMarquee logos={logos} />
      <ScrollReveal>
        <CoreServices header={content.home.coreServices} services={content.services} />
      </ScrollReveal>
      <ScrollReveal>
        <ControlCentrePreview section={content.home.controlCentrePreview} steps={steps} />
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
      {insights.length > 0 ? (
        <ScrollReveal>
          <InsightsTeaser insights={insights} />
        </ScrollReveal>
      ) : null}
      <ComplianceStrip heading={certifications.heading} items={certifications.items} />
      <ScrollReveal>
        <ContactCta section={content.home.contactCta} site={content.site} />
      </ScrollReveal>
    </>
  );
}
