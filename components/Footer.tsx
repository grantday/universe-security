import Link from "next/link";
import { footerColumns, siteConfig } from "@/lib/site-config";
import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-900 text-sm font-black text-white">
                U
              </span>
              <p className="font-display text-xl font-bold text-brand-900">{siteConfig.name}</p>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-600">{siteConfig.description}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-700">
              <a href={`tel:${siteConfig.salesPhone}`} className="inline-flex items-center gap-2 hover:text-brand-700">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.salesPhoneDisplay}
              </a>
              <p>{siteConfig.address.full}</p>
            </div>
          </div>
          {Object.values(footerColumns).map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-700 hover:text-brand-700 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
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
