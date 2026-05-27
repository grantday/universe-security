import { getIcon } from "@/lib/content/icons";
import type { SiteContent } from "@/lib/content/schema";
import type { ValuePropItem } from "@/lib/payload/map-content";

function PropCard({ pillar, featured }: { pillar: ValuePropItem; featured?: boolean }) {
  const Icon = getIcon(pillar.icon);
  return (
    <li
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${
        featured ? "lg:col-span-2 lg:row-span-2 lg:p-8" : ""
      }`}
    >
      <Icon className={`text-brand-300 ${featured ? "h-10 w-10" : "h-8 w-8"}`} aria-hidden />
      <h3 className={`mt-4 font-display font-bold text-white ${featured ? "text-2xl" : "text-lg"}`}>
        {pillar.title}
      </h3>
      <p className={`mt-2 text-white/75 ${featured ? "text-base" : "text-sm"}`}>{pillar.body}</p>
    </li>
  );
}

export function WhyChoose({ section }: { section: SiteContent["home"]["whyChoose"] }) {
  const pillars = section.pillars as ValuePropItem[];
  const featured = pillars.find((p) => p.featured) ?? pillars[0];
  const rest = pillars.filter((p) => p !== featured);

  return (
    <section className="bg-brand-900 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{section.heading}</h2>
        <p className="mt-4 max-w-2xl text-white/75">{section.intro}</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {featured ? <PropCard pillar={featured} featured /> : null}
          {rest.map((p) => (
            <PropCard key={p.title} pillar={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
