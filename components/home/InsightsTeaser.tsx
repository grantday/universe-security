import Link from "next/link";
import type { InsightListItem } from "@/lib/payload/queries";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-ZW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function InsightsTeaser({ insights }: { insights: InsightListItem[] }) {
  if (!insights.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Latest insights
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Security alerts, prevention tips, and case studies from our control-room team.
            </p>
          </div>
          <Link href="/insights" className="text-sm font-semibold text-brand-700 hover:text-brand-900">
            View all insights →
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-card transition-shadow hover:shadow-soft">
                <time className="text-xs font-semibold uppercase tracking-wide text-slate-500" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <h3 className="mt-3 font-display text-lg font-bold text-brand-900">
                  <Link href={`/insights/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{post.excerpt}</p>
                <Link
                  href={`/insights/${post.slug}`}
                  className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                  Read more
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
