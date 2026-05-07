import type { Metadata } from "next";
import { HeartHandshake, Lightbulb, Scale, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Mission, vision, values, and compliance — Universe Security is building a technology-driven regional security leader.",
};

const values = [
  { title: "Integrity", body: "We do what we say — transparent SLAs and honest reporting.", icon: Scale },
  { title: "Accountability", body: "Every incident has an owner from signal to closure.", icon: Target },
  { title: "Responsiveness", body: "Seconds matter — our control room is built for speed.", icon: HeartHandshake },
  { title: "Innovation", body: "We adopt tools that measurably reduce risk for clients.", icon: Lightbulb },
] as const;

export default function CompanyPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Company</h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-100 bg-brand-50/40 p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">Mission</h2>
            <p className="mt-3 text-xl font-semibold text-brand-900">Intelligent, responsive security</p>
            <p className="mt-3 text-slate-600">
              Deliver integrated protection that combines trained people, disciplined processes, and modern systems —
              so clients can operate with confidence.
            </p>
          </section>
          <section className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">Vision</h2>
            <p className="mt-3 text-xl font-semibold text-brand-900">Regional security leader</p>
            <p className="mt-3 text-slate-600">
              Become the most trusted technology-driven security partner across Zimbabwe and neighbouring markets.
            </p>
          </section>
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold text-brand-900">Values</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
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
          <h2 className="font-display text-xl font-bold text-brand-900">Compliance</h2>
          <p className="mt-3 text-slate-600">
            We maintain licensing appropriate to guarding and electronic security services, and treat client information
            under strict confidentiality agreements. Documentation is available during onboarding and renewal.
          </p>
        </section>
      </div>
    </div>
  );
}
