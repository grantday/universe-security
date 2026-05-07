import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Home, business, industrial, and specialised security solutions — guarding, CCTV, access control, and control-room monitoring.",
};

const sections = [
  {
    id: "home",
    title: "Home Security",
    lead: "Smart integration with panic pathways and perimeter protection.",
    items: ["Alarm systems", "CCTV", "Smart integration", "Perimeter protection", "Panic response"],
  },
  {
    id: "business",
    title: "Business Security",
    lead: "Guarding, access control, and risk-aligned assessments for commercial sites.",
    items: ["Guarding", "Access control", "CCTV monitoring", "Risk assessments", "Asset protection"],
  },
  {
    id: "industrial",
    title: "Industrial Security",
    lead: "High-risk sites, logistics movements, and loss prevention programmes.",
    items: ["Site guarding", "Logistics escort", "High-risk protection", "Loss prevention"],
  },
  {
    id: "specialised",
    title: "Specialised Services",
    lead: "Tailored teams for VIP protection, investigations, and major events.",
    items: ["VIP protection", "Investigations", "Events & crowd support", "Bespoke deployments"],
  },
] as const;

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-brand-50/50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">Solutions</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Integrated protection for every environment — aligned to your risk profile and reporting needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-500"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:space-y-24 lg:px-8 lg:py-20">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="font-display text-3xl font-bold text-brand-900">{s.title}</h2>
                <p className="mt-4 text-slate-600">{s.lead}</p>
                <Button href="/contact" className="mt-8">
                  Request assessment
                </Button>
              </div>
              <ul className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-slate-100 py-3 last:border-0">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                    <span className="text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <div className="rounded-2xl bg-brand-900 px-6 py-10 text-center text-white sm:px-10">
          <p className="font-display text-xl font-bold">Need a blended programme?</p>
          <p className="mt-2 text-white/85">We design multi-site coverage with one control-room view.</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-50"
          >
            Speak to our team
          </Link>
        </div>
      </div>
    </div>
  );
}
