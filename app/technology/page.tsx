import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { getIcon } from "@/lib/content/icons";
import { getContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "CCTV, alarms, GPS tracking, mobile app, and incident reporting — with encryption, access control, and audit logs.",
};

export default async function TechnologyPage() {
  const { pages } = await getContent();
  const page = pages.technology;

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{page.intro}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.stack.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-accent-amber/20 px-2 py-1 text-xs font-semibold text-amber-900">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-brand-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-slate-100 pt-16">
          <h2 className="font-display text-2xl font-bold text-brand-900">{page.dataSecurityHeading}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {page.dataSecurity.map((d) => {
              const Icon = getIcon(d.icon);
              return (
                <article key={d.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                  <Icon className="h-8 w-8 text-brand-600" aria-hidden />
                  <h3 className="mt-4 font-display text-base font-bold text-brand-900">{d.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{d.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href={page.ctaHref}>{page.ctaLabel}</Button>
        </div>
      </div>
    </div>
  );
}
