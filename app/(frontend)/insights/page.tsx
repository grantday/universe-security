import Link from "next/link";
import type { Metadata } from "next";
import { listInsights, formatDate } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Security alerts, crime prevention tips, industry updates, and case studies from Universe Security.",
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function InsightsPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { items: posts } = await listInsights(page, 9);

  return (
    <div className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Insights</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Security alerts, prevention tips, industry updates, and case studies.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft">
                <time className="text-xs font-semibold uppercase tracking-wide text-slate-500" dateTime={p.publishedAt}>
                  {formatDate(p.publishedAt)}
                </time>
                <h2 className="mt-3 font-display text-lg font-bold text-brand-900">
                  <Link href={`/insights/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.excerpt}</p>
                <Link
                  href={`/insights/${p.slug}`}
                  className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                  Read more
                </Link>
              </article>
            </li>
          ))}
        </ul>
        {page > 1 ? (
          <div className="mt-10">
            <Link href="/insights" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
              ← Back to latest
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
