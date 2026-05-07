import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";
import { Mail, Phone } from "lucide-react";

export function ContactCta() {
  return (
    <section className="bg-brand-900 py-16 text-white sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Ready to strengthen coverage?</h2>
          <p className="mt-4 max-w-xl text-white/85">
            Send a quick enquiry or call our team. For emergencies, use the 24/7 hotline — always visible across the
            site.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/90 sm:flex-row sm:items-center sm:gap-8">
            <a href={`tel:${siteConfig.salesPhone}`} className="inline-flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" aria-hidden />
              {siteConfig.salesPhoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4" aria-hidden />
              {siteConfig.email}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="secondary" className="!bg-white !text-brand-900">
            Contact us
          </Button>
          <Link
            href={`tel:${siteConfig.emergencyPhone}`}
            className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          >
            Emergency hotline
          </Link>
        </div>
      </div>
    </section>
  );
}
