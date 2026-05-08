import type { Metadata } from "next";
import { Activity, MapPin, ShieldAlert, ScrollText } from "lucide-react";
import { IncidentFlow } from "@/components/IncidentFlow";
import { MockDashboard } from "@/components/MockDashboard";
import { Button } from "@/components/Button";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export const metadata: Metadata = {
  title: "Control Centre",
  description:
    "Centralised 24/7 operations — incident flow from alarm to resolution, live monitoring, GPS tracking, escalation, and audit trails.",
};

const features = [
  {
    title: "Live monitoring",
    body: "Unified alarm and CCTV signals with operator workflows and priority queues.",
    icon: Activity,
  },
  {
    title: "GPS tracking",
    body: "Patrol and response units visible on-map for dispatch accuracy and SLA reporting.",
    icon: MapPin,
  },
  {
    title: "Escalation system",
    body: "Tiered alerts to supervisors, clients, and emergency services when thresholds are met.",
    icon: ShieldAlert,
  },
  {
    title: "Audit trail",
    body: "Immutable logs from signal receipt through dispatch, on-site actions, and closure.",
    icon: ScrollText,
  },
] as const;

export default function ControlCentrePage() {
  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-brand-900 to-brand-700 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Control Centre</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Incident flow: Alarm → Control Room → Dispatch → Response → Resolution. One hub, full traceability.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <IncidentFlow />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="aspect-[16/10]">
            <PlaceholderImage seed="alarm" label="Alarm signal" theme="cctv" className="h-full w-full" />
          </div>
          <div className="aspect-[16/10]">
            <PlaceholderImage seed="dispatch" label="Dispatch coordination" theme="dispatch" className="h-full w-full" />
          </div>
          <div className="aspect-[16/10]">
            <PlaceholderImage seed="response" label="Rapid response units" theme="response" className="h-full w-full" />
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-brand-900">{f.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <MockDashboard />
        </div>
        <div className="mt-16 text-center">
          <Button href="/contact">Book a control-centre walkthrough</Button>
        </div>
      </div>
    </div>
  );
}
