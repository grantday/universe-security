import { KpiCounter } from "@/components/KpiCounter";
import type { SiteContent } from "@/lib/content/schema";

export function KpiSection({
  header,
  kpis,
}: {
  header: SiteContent["home"]["kpisSection"];
  kpis: SiteContent["kpis"];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{header.heading}</h2>
          <p className="mt-4 text-slate-600">{header.intro}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {kpis.map((kpi) =>
            kpi.numericValue != null ? (
              <KpiCounter
                key={kpi.label}
                label={kpi.label}
                value={kpi.numericValue}
                suffix={kpi.suffix}
                prefix={kpi.prefix}
              />
            ) : (
              <div key={kpi.label} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kpi.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
                  {kpi.prefix}
                  {kpi.value}
                  {kpi.suffix}
                </p>
                {kpi.note ? <p className="mt-2 text-xs text-slate-500">{kpi.note}</p> : null}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}


