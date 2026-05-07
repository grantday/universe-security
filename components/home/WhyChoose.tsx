import { BarChart3, Cpu, Headphones, Shield, Zap } from "lucide-react";

const pillars = [
  {
    title: "Integrated systems",
    body: "Alarms, CCTV, access, and patrol data unified for faster decisions.",
    icon: Cpu,
  },
  {
    title: "Centralised control",
    body: "One control room view across residential, commercial, and industrial sites.",
    icon: Shield,
  },
  {
    title: "Trained personnel",
    body: "Licensed teams with clear SOPs and escalation paths.",
    icon: Headphones,
  },
  {
    title: "Rapid response",
    body: "GPS-tracked units and prioritised dispatch when seconds matter.",
    icon: Zap,
  },
  {
    title: "Transparent reporting",
    body: "Incident logs, audit trails, and client-ready summaries.",
    icon: BarChart3,
  },
] as const;

export function WhyChoose() {
  return (
    <section className="border-y border-slate-100 bg-brand-50/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          Why choose Universe Security
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          We combine physical security with technology-led operations — so you get fewer blind spots and faster
          outcomes.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <li
                key={p.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
              >
                <Icon className="h-8 w-8 text-brand-600" aria-hidden />
                <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
