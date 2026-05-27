import type { Metadata } from "next";
import { IndustryCard } from "@/components/IndustryCard";
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Security programmes for residential, retail, banking, construction, logistics, schools, industrial, government, and events in Zimbabwe.",
};

export default async function IndustriesPage() {
  const { pages } = await getContent();
  const page = pages.industries;

  return (
    <div className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{page.intro}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.items.map((ind) => (
            <IndustryCard
              key={ind.title}
              title={ind.title}
              blurb={ind.blurb}
              iconKey={ind.icon}
              imageUrl={"imageUrl" in ind ? (ind.imageUrl as string | undefined) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
