import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getInsightBySlug, getInsightSlugs } from "@/lib/insights";
import { ProseMdx } from "@/components/mdx/Prose";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: { title: post.frontmatter.title, description: post.frontmatter.description },
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();
  const { frontmatter, content } = post;
  return (
    <article className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/insights" className="text-sm font-semibold text-brand-700 hover:underline">
          ← All insights
        </Link>
        <header className="mt-8">
          <time className="text-sm font-medium text-slate-500" dateTime={frontmatter.date}>
            {frontmatter.date}
          </time>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-brand-900">{frontmatter.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{frontmatter.description}</p>
        </header>
        <div className="mt-12">
          <ProseMdx source={content} />
        </div>
      </div>
    </article>
  );
}
