import Link from "next/link";
import { footerColumns, siteConfig } from "@/lib/site-config";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-brand-900 text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-white ring-1 ring-white/10">
                U
              </span>
              <p className="font-display text-xl font-bold text-white">{siteConfig.name}</p>
            </div>
            <p className="mt-3 max-w-md text-sm text-white/75">{siteConfig.description}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-white/80">
              <a href={`tel:${siteConfig.salesPhone}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.salesPhoneDisplay}
              </a>
              <p>{siteConfig.address.full}</p>
            </div>
          </div>
          {Object.values(footerColumns).map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/80 hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={`tel:${siteConfig.emergencyPhone}`}
            className="inline-flex items-center justify-center rounded-xl bg-accent-red px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-red-700"
          >
            Emergency: {siteConfig.emergencyPhoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
