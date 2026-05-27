"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  Images,
  Inbox,
  Layers,
  Search,
  Settings,
  XCircle,
} from "lucide-react";
import type { StudioDashboardSnapshot } from "@/lib/studio/dashboard";
import type { SeoCheckStatus } from "@/lib/seo/analyze";
import { studioBtnPrimary } from "@/components/studio/studio-ui";

const quickLinks = [
  { title: "Layered hero", href: "/studio/home/hero-slides", icon: Images },
  { title: "Response metrics", href: "/studio/home/response-metrics", icon: BarChart3 },
  { title: "Trust badges", href: "/studio/home/trust-badges", icon: Award },
  { title: "Section headers", href: "/studio/home/sections", icon: FileText },
  { title: "Site & SEO", href: "/studio/site", icon: Settings },
  { title: "Collections", href: "/studio/collections", icon: Layers },
  { title: "Contact inbox", href: "/studio/inbox", icon: Inbox },
];

function StatusIcon({ status }: { status: SeoCheckStatus }) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />;
  if (status === "warn") return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden />;
  return <XCircle className="h-4 w-4 shrink-0 text-red-600" aria-hidden />;
}

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 55) return "text-amber-700";
  return "text-red-700";
}

export function StudioDashboard() {
  const [data, setData] = useState<StudioDashboardSnapshot | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [slowHint, setSlowHint] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError("");
      setSlowHint(false);
      const slowTimer = window.setTimeout(() => setSlowHint(true), 4000);
      const res = await fetch("/api/studio/dashboard", { credentials: "include" });
      window.clearTimeout(slowTimer);
      setLoading(false);
      setSlowHint(false);
      if (res.status === 401) {
        window.location.href = "/studio/login?next=/studio";
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError((body as { error?: string }).error ?? "Could not load dashboard");
        return;
      }
      setData((await res.json()) as StudioDashboardSnapshot);
    })();
  }, []);

  const c = data?.content;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-display text-xl font-bold text-slate-900">Site overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Live counts from Payload. Refresh this page after publishing changes elsewhere.
          </p>
          {loading ? (
            <div className="mt-6 text-sm text-slate-500">
              <p>Loading analysis from Payload…</p>
              {slowHint ? (
                <p className="mt-2 text-amber-700">
                  First load in dev can take 10–30 seconds while the database and routes compile. Leave this tab
                  open.
                </p>
              ) : null}
            </div>
          ) : error ? (
            <p className="mt-6 text-sm text-red-700">{error}</p>
          ) : c ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Metric label="Hero slides" value={String(c.heroSlides)} />
              <Metric label="Trust badges" value={String(c.trustBadges)} />
              <Metric
                label="Services"
                value={`${c.services.published} / ${c.services.total} live`}
              />
              <Metric
                label="Industries"
                value={`${c.industries.published} / ${c.industries.total} live`}
              />
              <Metric
                label="Insights"
                value={`${c.insights.published} live · ${c.insights.draft} draft`}
              />
              <Metric label="Flow steps" value={String(c.flowSteps)} />
              <Metric
                label="Testimonials"
                value={`${c.testimonials.published} / ${c.testimonials.total}`}
              />
              <Metric label="Response metrics" value={`${c.metrics.published} / ${c.metrics.total}`} />
              <Metric
                label="Value props"
                value={`${c.valueProps.published} / ${c.valueProps.total}`}
              />
            </dl>
          ) : null}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-[#2f4050]" aria-hidden />
            <h3 className="font-display font-bold text-slate-900">Contact inbox</h3>
          </div>
          {data ? (
            <>
              <p className="mt-3 text-3xl font-bold text-slate-900">{data.inbox.total}</p>
              <p className="text-sm text-slate-600">total submissions</p>
              <p className="mt-4 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">{data.inbox.last7Days}</span> in the last 7 days
              </p>
              <Link
                href="/studio/inbox"
                className="mt-4 inline-block text-sm font-semibold text-[#2f4050] hover:underline"
              >
                Open inbox →
              </Link>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">—</p>
          )}
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2f4050]/10">
              <Search className="h-5 w-5 text-[#2f4050]" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">SEO analysis</h2>
              <p className="text-sm text-slate-600">Search and social readiness for the public site.</p>
            </div>
          </div>
          {data ? (
            <div className="text-right">
              <p className={`text-4xl font-bold tabular-nums ${scoreColor(data.seo.score)}`}>{data.seo.score}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Health score</p>
            </div>
          ) : null}
        </div>

        {data ? (
          <>
            <p className="mt-4 text-sm text-slate-600">
              Canonical URL:{" "}
              <a href={data.seo.siteUrl} className="font-semibold text-[#2f4050] hover:underline" target="_blank" rel="noreferrer">
                {data.seo.siteUrl}
              </a>
              {" · "}
              <a href={data.seo.sitemapUrl} className="font-semibold text-[#2f4050] hover:underline" target="_blank" rel="noreferrer">
                sitemap.xml
              </a>
            </p>
            <ul className="mt-6 space-y-3">
              {data.seo.checks.map((check) => (
                <li
                  key={check.id}
                  className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm"
                >
                  <StatusIcon status={check.status} />
                  <div>
                    <p className="font-semibold text-slate-900">{check.label}</p>
                    <p className="mt-0.5 text-slate-600">{check.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/studio/site" className={studioBtnPrimary}>
                Edit SEO settings
              </Link>
              <a
                href={data.seo.sitemapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View sitemap
              </a>
            </div>
          </>
        ) : loading ? (
          <p className="mt-6 text-sm text-slate-500">Running checks…</p>
        ) : null}
      </section>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Quick actions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <link.icon className="h-8 w-8 text-[#2f4050]" aria-hidden />
              <p className="mt-3 font-display font-bold text-slate-900 group-hover:text-[#2f4050]">{link.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold text-slate-900">{value}</dd>
    </div>
  );
}
