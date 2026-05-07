import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Camera, MapPinned, Radio, Smartphone, FileWarning, Lock, KeyRound, ClipboardList } from "lucide-react";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "CCTV, alarms, GPS tracking, mobile app, and incident reporting — with encryption, access control, and audit logs.",
};

type StackItem = {
  title: string;
  body: string;
  icon: LucideIcon;
  badge?: string;
};

const stack: StackItem[] = [
  { title: "CCTV systems", body: "Site-wide visibility with remote review and retention policies.", icon: Camera },
  { title: "Alarm systems", body: "Intrusion and perimeter alarms integrated to the control room.", icon: Radio },
  { title: "GPS tracking", body: "Live unit tracking for patrol accountability and faster routing.", icon: MapPinned },
  {
    title: "Mobile app",
    body: "Client and field workflows — coming soon on iOS and Android.",
    icon: Smartphone,
    badge: "Coming soon",
  },
  {
    title: "Incident reporting",
    body: "Structured reports with attachments for insurers and internal compliance.",
    icon: FileWarning,
  },
];

const dataSecurity = [
  { title: "Encryption", body: "Data in transit protected with modern TLS configurations.", icon: Lock },
  { title: "Access control", body: "Role-based permissions for operators, supervisors, and clients.", icon: KeyRound },
  { title: "Audit logs", body: "Tamper-evident activity trails for critical configuration changes.", icon: ClipboardList },
] as const;

export default function TechnologyPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Technology</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Technology-led operations with pragmatic controls for confidentiality and uptime.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-accent-amber/20 px-2 py-1 text-xs font-semibold text-amber-900">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-brand-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-slate-100 pt-16">
          <h2 className="font-display text-2xl font-bold text-brand-900">Data security</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            We design our stack around least privilege, encryption, and defensible audit evidence.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {dataSecurity.map((d) => {
              const Icon = d.icon;
              return (
                <article key={d.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                  <Icon className="h-8 w-8 text-brand-600" aria-hidden />
                  <h3 className="mt-4 font-display text-base font-bold text-brand-900">{d.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{d.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href="/contact">Discuss your technology stack</Button>
        </div>
      </div>
    </div>
  );
}
