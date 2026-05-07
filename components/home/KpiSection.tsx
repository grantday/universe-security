import { KpiCounter } from "@/components/KpiCounter";

export function KpiSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Response metrics
          </h2>
          <p className="mt-4 text-slate-600">
            Illustrative KPIs for marketing — replace with audited operational statistics.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average response time</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">&lt; 8 min</p>
            <p className="mt-2 text-xs text-slate-500">Illustrative target — replace with verified metric.</p>
          </div>
          <KpiCounter label="Active patrol units" value={42} />
          <KpiCounter label="Daily incidents handled" value={120} suffix="+" />
        </div>
      </div>
    </section>
  );
}
