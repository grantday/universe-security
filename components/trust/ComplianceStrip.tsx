import { ShieldCheck } from "lucide-react";
import type { CertificationItem } from "@/lib/payload/trust-content";

type Props = {
  heading: string;
  items: CertificationItem[];
  variant?: "light" | "dark";
};

export function ComplianceStrip({ heading, items, variant = "light" }: Props) {
  const isDark = variant === "dark";
  return (
    <section
      aria-label="Certifications and compliance"
      className={isDark ? "bg-navy py-14 text-white sm:py-16" : "border-y border-slate-100 bg-surface py-14 sm:py-16"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className={
                isDark ? "text-xs font-semibold uppercase tracking-[0.2em] text-white/60" : "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              }
            >
              Compliance
            </p>
            <h2 className={`mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl ${isDark ? "text-white" : "text-brand-900"}`}>
              {heading}
            </h2>
          </div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className={
                isDark
                  ? "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  : "rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
              }
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? "bg-amber-brand/20 text-amber-brand" : "bg-brand-50 text-brand-700"}`}
              >
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <h3 className={`font-display text-lg font-bold ${isDark ? "text-white" : "text-brand-900"}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-white/75" : "text-slate-600"}`}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
