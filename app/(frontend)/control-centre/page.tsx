import type { Metadata } from "next";
import { IncidentFlow } from "@/components/IncidentFlow";
import { ControlCentreSimulator } from "@/components/control-centre/ControlCentreSimulator";
import { Button } from "@/components/Button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { getIcon } from "@/lib/content/icons";
import { getContent } from "@/lib/content/get";
import { getControlCentreSteps, getPublishedMetrics } from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "Control Centre",
  description:
    "Centralised 24/7 operations — incident flow from alarm to resolution, live monitoring, GPS tracking, escalation, and audit trails.",
};

export default async function ControlCentrePage() {
  const [{ pages }, steps, kpis] = await Promise.all([
    getContent(),
    getControlCentreSteps(),
    getPublishedMetrics(),
  ]);
  const page = pages.controlCentre;

  return (
    <div className="bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-brand-900 to-brand-700 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{page.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{page.heroIntro}</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <IncidentFlow steps={steps} />
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
            {page.features.map((f) => {
              const Icon = getIcon(f.icon);
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
          <ControlCentreSimulator steps={steps} kpis={kpis} />
        </div>
        <div className="mt-16 text-center">
          <Button href={page.ctaHref}>{page.ctaLabel}</Button>
        </div>
      </div>
    </div>
  );
}
