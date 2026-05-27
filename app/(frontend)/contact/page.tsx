import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { AssessmentWizard } from "@/components/contact/AssessmentWizard";
import { siteConfig } from "@/lib/site-config";
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Universe Security — enquiries, assessments, and 24/7 emergency hotline.",
};

export default async function ContactPage() {
  const content = await getContent();
  const page = content.pages.contact;
  const { site } = content;

  return (
    <div className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{page.intro}</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8 shadow-card">
              <h2 className="font-display text-xl font-bold text-brand-900">Security assessment</h2>
              <p className="mt-2 text-sm text-slate-600">
                Answer a few questions so our team can scope coverage, response times, and the right mix of guarding,
                CCTV, and control-room monitoring.
              </p>
              <p className="mt-3 text-xs text-slate-500">{site.officeHours}</p>
              <div className="mt-8">
                <AssessmentWizard officeHours={site.officeHours} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
              <h2 className="font-display text-xl font-bold text-brand-900">{page.formHeading}</h2>
              <p className="mt-2 text-sm text-slate-600">{page.formIntro}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-red-100 bg-red-50/80 p-6">
              <h2 className="font-display text-lg font-bold text-accent-red">{page.emergencyHeading}</h2>
              <a
                href={`tel:${site.emergencyPhone}`}
                className="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-brand-900 hover:underline"
              >
                <Phone className="h-6 w-6 text-accent-red" aria-hidden />
                {site.emergencyPhoneDisplay}
              </a>
              <p className="mt-2 text-sm text-slate-700">{page.emergencyNote}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-900">{page.officeHeading}</h2>
              <p className="mt-3 inline-flex gap-2 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                {site.addressFull}
              </p>
              <p className="mt-4 inline-flex gap-2 text-sm text-slate-600">
                <Clock className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                {site.officeHours}
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Sales:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={`tel:${site.salesPhone}`}>
                  {site.salesPhoneDisplay}
                </a>
                <br />
                Email:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
              <iframe
                title="Office location map"
                src={siteConfig.mapEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
