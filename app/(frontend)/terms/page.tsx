import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Universe Security website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-brand-900">Terms of Use</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>
        <div className="mt-10 space-y-6 text-slate-700">
          <p>
            By using this website, you agree to these terms. If you do not agree, please discontinue use of the site.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">No guarantee of response times online</h2>
          <p>
            Website forms and silent alerts are not a substitute for emergency services. For immediate danger, contact
            local emergency authorities and use our 24/7 voice hotline.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">Service engagements</h2>
          <p>
            Security services are provided under separate written agreements. Nothing on this site amends an executed
            contract unless expressly stated.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-900">Limitation of liability</h2>
          <p>
            To the extent permitted by law, {siteConfig.name} is not liable for indirect or consequential damages arising
            from use of this website.
          </p>
          <p className="text-sm text-slate-500">
            This is sample legal text for demonstration — replace with counsel-approved wording.
          </p>
        </div>
      </div>
    </div>
  );
}
