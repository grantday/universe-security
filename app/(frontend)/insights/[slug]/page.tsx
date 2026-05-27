import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { allInsightSlugs, formatDate, loadInsight, listInsights } from "@/lib/insights";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSeoConfig } from "@/lib/seo/site-seo";
import { ProseMdx } from "@/components/mdx/Prose";
import { PayloadRichText } from "@/components/PayloadRichText";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { CaseStudyPanel } from "@/components/insights/CaseStudyPanel";
import { InsightShareBar } from "@/components/insights/InsightShareBar";
import { getRequestSiteUrl, insightArticleUrl } from "@/lib/public-site-url";
import { payloadInsightHasBody } from "@/lib/insights";
import {
  buildInsightShareText,
  buildWhatsAppInsightShareText,
  insightBodyFromLexical,
  insightBodyFromMdx,
} from "@/lib/share/insight-share";
import { getContent } from "@/lib/content/get";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await allInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadInsight(slug);
  if (!post) return {};

  if (post.source === "payload") {
    const title = post.insight.title;
    const description = post.insight.excerpt;
    const seo = await getSiteSeoConfig();
    if (seo) {
      return buildPageMetadata(seo, {
        title,
        description,
        path: `/insights/${slug}`,
        ogImageUrl: post.insight.heroImageUrl || seo.ogImageUrl,
      });
    }
    return { title, description };
  }

  const title = post.frontmatter.title;
  const description = post.frontmatter.description;
  const seo = await getSiteSeoConfig();
  if (seo) {
    return buildPageMetadata(seo, { title, description, path: `/insights/${slug}` });
  }
  return { title, description };
}

async function insightShareProps(
  slug: string,
  title: string,
  publishedAt: string,
  excerpt: string,
  body: string,
) {
  const content = await getContent();
  const baseUrl = await getRequestSiteUrl();
  const pageUrl = insightArticleUrl(baseUrl, slug);
  const shareInput = {
    title,
    publishedAt: formatDate(publishedAt),
    excerpt,
    body,
    url: pageUrl,
    siteName: content.site.name,
  };
  return {
    shareText: buildInsightShareText(shareInput),
    whatsappShareText: buildWhatsAppInsightShareText(shareInput),
    pageUrl,
    title,
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadInsight(slug);
  if (!post) notFound();

  const related = (await listInsights(1, 4)).items.filter((i) => i.slug !== slug).slice(0, 3);

  if (post.source === "payload") {
    const { insight, mdxFallback } = post;
    const lexicalBody = insightBodyFromLexical(insight.content);
    const bodyForShare =
      lexicalBody.trim() || (mdxFallback ? insightBodyFromMdx(mdxFallback.content) : "");
    const share = await insightShareProps(
      insight.slug,
      insight.title,
      insight.publishedAt,
      insight.excerpt,
      bodyForShare,
    );
    const useMdxBody = !payloadInsightHasBody(insight) && mdxFallback;
    return (
      <>
        <ArticleJsonLd
          title={insight.title}
          description={insight.excerpt}
          slug={slug}
          publishedAt={insight.publishedAt}
        />
      <article className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/insights" className="text-sm font-semibold text-brand-700 hover:underline">
            ← All insights
          </Link>
          <header className="mt-8">
            {insight.contentType === "case-study" ? (
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                Case study
              </span>
            ) : null}
            <time className="mt-3 block text-sm font-medium text-slate-500" dateTime={insight.publishedAt}>
              {formatDate(insight.publishedAt)}
            </time>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-brand-900">{insight.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{insight.excerpt}</p>
            {insight.heroImageUrl ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-100 shadow-card">
                <Image src={insight.heroImageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" priority />
              </div>
            ) : null}
          </header>
          {insight.contentType === "case-study" && insight.caseStudy ? (
            <CaseStudyPanel
              problem={insight.caseStudy.problem}
              approach={insight.caseStudy.approach}
              metrics={insight.caseStudy.metrics}
            />
          ) : null}
          <InsightShareBar
            shareText={share.shareText}
            whatsappShareText={share.whatsappShareText}
            pageUrl={share.pageUrl}
            title={share.title}
          />
          <div className="mt-12">
            {useMdxBody ? (
              <ProseMdx source={mdxFallback.content} />
            ) : (
              <PayloadRichText content={insight.content} />
            )}
          </div>
          {related.length > 0 ? (
            <aside className="mt-16 border-t border-slate-100 pt-10">
              <h2 className="font-display text-xl font-bold text-brand-900">Related insights</h2>
              <ul className="mt-6 space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/insights/${r.slug}`} className="font-semibold text-brand-700 hover:underline">
                      {r.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">{r.excerpt}</p>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </article>
      </>
    );
  }

  const { frontmatter, content } = post;
  const share = await insightShareProps(
    slug,
    frontmatter.title,
    frontmatter.date,
    frontmatter.description,
    insightBodyFromMdx(content),
  );
  return (
    <>
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        slug={slug}
        publishedAt={frontmatter.date}
      />
    <article className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/insights" className="text-sm font-semibold text-brand-700 hover:underline">
          ← All insights
        </Link>
        <header className="mt-8">
          <time className="text-sm font-medium text-slate-500" dateTime={frontmatter.date}>
            {formatDate(frontmatter.date)}
          </time>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-brand-900">{frontmatter.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{frontmatter.description}</p>
        </header>
        <InsightShareBar
          shareText={share.shareText}
          whatsappShareText={share.whatsappShareText}
          pageUrl={share.pageUrl}
          title={share.title}
        />
        <div className="mt-12">
          <ProseMdx source={content} />
        </div>
      </div>
    </article>
    </>
  );
}
