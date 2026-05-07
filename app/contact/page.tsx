import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Universe Security in ${siteConfig.address.city} — enquiries, assessments, and 24/7 emergency hotline.`,
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Contact</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Send an enquiry or call our team. For emergencies, use the hotline — monitored 24/7.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl font-bold text-brand-900">Quick enquiry</h2>
            <p className="mt-2 text-sm text-slate-600">Fields marked by labels are required.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-red-100 bg-red-50/80 p-6">
              <h2 className="font-display text-lg font-bold text-accent-red">Emergency hotline</h2>
              <a
                href={`tel:${siteConfig.emergencyPhone}`}
                className="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-brand-900 hover:underline"
              >
                <Phone className="h-6 w-6 text-accent-red" aria-hidden />
                {siteConfig.emergencyPhoneDisplay}
              </a>
              <p className="mt-2 text-sm text-slate-700">For immediate threats to life or property — call now.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg font-bold text-brand-900">Office</h2>
              <p className="mt-3 inline-flex gap-2 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                {siteConfig.address.full}
              </p>
              <p className="mt-4 inline-flex gap-2 text-sm text-slate-600">
                <Clock className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                {siteConfig.officeHours}
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Sales:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={`tel:${siteConfig.salesPhone}`}>
                  {siteConfig.salesPhoneDisplay}
                </a>
                <br />
                Email:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
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
