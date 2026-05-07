import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Universe Security handles personal data collected through this website.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-brand-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>
        <div className="mt-10 space-y-6 text-slate-700">
          <p>
            {siteConfig.name} (“we”, “us”) respects your privacy. This policy describes how we process information you
            provide through our website forms and emergency features.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">Information we collect</h2>
          <p>
            When you submit a contact or assessment enquiry, we collect the details you provide (such as name, phone,
            email, service interest, and message). Silent emergency alerts may include optional notes and approximate
            location if you grant browser permission.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">How we use information</h2>
          <p>
            We use this information to respond to enquiries, coordinate security services, and operate our control
            centre workflows. We do not sell your personal data.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">Retention</h2>
          <p>
            We retain enquiry and incident-related records only as long as needed for operations, legal obligations, and
            legitimate business purposes.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a className="font-semibold text-brand-700 hover:underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
          <p className="text-sm text-slate-500">
            This is sample legal text for demonstration — replace with counsel-approved wording.
          </p>
        </div>
      </div>
    </div>
  );
}
