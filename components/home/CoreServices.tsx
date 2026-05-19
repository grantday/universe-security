import { ServicesSlider } from "@/components/home/ServicesSlider";
import type { ServiceCard, SiteContent } from "@/lib/content/schema";

export function CoreServices({
  header,
  services,
}: {
  header: SiteContent["home"]["coreServices"];
  services: ServiceCard[];
}) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{header.heading}</h2>
          <p className="mt-4 text-slate-600">{header.intro}</p>
        </div>
        <ServicesSlider services={services} />
      </div>
    </section>
  );
}
