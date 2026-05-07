import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  blurb: string;
  icon: LucideIcon;
};

export function IndustryCard({ title, blurb, icon: Icon }: Props) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-brand-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{blurb}</p>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        Talk to us
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  );
}
