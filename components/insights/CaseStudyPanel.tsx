import type { CaseStudyMetric } from "@/lib/payload/insight-types";

type Props = {
  problem: string;
  approach: string;
  metrics: CaseStudyMetric[];
};

export function CaseStudyPanel({ problem, approach, metrics }: Props) {
  return (
    <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-brand-700">Challenge</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{problem}</p>
        </section>
        <section>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-brand-700">Approach</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{approach}</p>
        </section>
      </div>
      {metrics.length > 0 ? (
        <aside className="h-fit rounded-2xl border border-slate-200 bg-surface p-6 shadow-card">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-slate-500">Results</h2>
          <dl className="mt-4 space-y-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-brand-900">{m.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      ) : null}
    </div>
  );
}
