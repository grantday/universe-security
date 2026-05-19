import type { Metadata } from "next";
import { getIcon } from "@/lib/content/icons";
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Mission, vision, values, and compliance — Universe Security is building a technology-driven regional security leader.",
};

export default async function CompanyPage() {
  const { pages } = await getContent();
  const page = pages.company;

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">{page.title}</h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-100 bg-brand-50/40 p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              {page.mission.eyebrow ?? "Mission"}
            </h2>
            <p className="mt-3 text-xl font-semibold text-brand-900">{page.mission.title}</p>
            <p className="mt-3 text-slate-600">{page.mission.body}</p>
          </section>
          <section className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              {page.vision.eyebrow ?? "Vision"}
            </h2>
            <p className="mt-3 text-xl font-semibold text-brand-900">{page.vision.title}</p>
            <p className="mt-3 text-slate-600">{page.vision.body}</p>
          </section>
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold text-brand-900">{page.valuesHeading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {page.values.map((v) => {
            const Icon = getIcon(v.icon);
            return (
              <article key={v.title} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6">
                <Icon className="h-8 w-8 text-brand-600" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.body}</p>
              </article>
            );
          })}
        </div>

        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
          <h2 className="font-display text-xl font-bold text-brand-900">{page.compliance.title}</h2>
          <p className="mt-3 text-slate-600">{page.compliance.body}</p>
        </section>
      </div>
    </div>
  );
}
