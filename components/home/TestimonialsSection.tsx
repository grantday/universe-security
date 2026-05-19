import { TestimonialSlider } from "@/components/TestimonialSlider";
import type { SiteContent } from "@/lib/content/schema";

export function TestimonialsSection({
  section,
  testimonials,
}: {
  section: SiteContent["home"]["testimonialsSection"];
  testimonials: SiteContent["testimonials"];
}) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          {section.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">{section.intro}</p>
        <div className="mt-12">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
