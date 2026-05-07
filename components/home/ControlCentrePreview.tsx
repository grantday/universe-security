import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IncidentFlow } from "@/components/IncidentFlow";

export function ControlCentrePreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Control Centre overview
            </h2>
            <p className="mt-4 text-slate-600">
              Our centralised 24/7 operations hub manages alarms, patrols, and escalations in real time — with full
              traceability from signal to resolution.
            </p>
            <Link
              href="/control-centre"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              Explore the Control Centre
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-6">
            <IncidentFlow compact />
          </div>
        </div>
      </div>
    </section>
  );
}
