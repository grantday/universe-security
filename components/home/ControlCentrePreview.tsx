import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IncidentFlow } from "@/components/IncidentFlow";
import type { SiteContent } from "@/lib/content/schema";
import type { FlowStep } from "@/lib/payload/map-content";

export function ControlCentrePreview({
  section,
  steps,
}: {
  section: SiteContent["home"]["controlCentrePreview"];
  steps?: FlowStep[];
}) {
  return (
    <section className="bg-brand-900 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{section.heading}</h2>
            <p className="mt-4 text-white/75">{section.intro}</p>
            <Link
              href={section.ctaHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white"
            >
              {section.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
            <IncidentFlow compact steps={steps} variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
