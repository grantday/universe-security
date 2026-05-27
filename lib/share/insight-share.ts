import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { lexicalToText } from "@/lib/payload/lexical";
import { mdxToPlainText } from "@/lib/share/mdx-to-text";

const MAX_BODY_CHARS = 3500;

export type InsightShareInput = {
  title: string;
  publishedAt: string;
  excerpt: string;
  body: string;
  url: string;
  siteName?: string;
};

export function insightBodyFromLexical(content: SerializedEditorState | null | undefined): string {
  return lexicalToText(content);
}

export function insightBodyFromMdx(content: string): string {
  return mdxToPlainText(content);
}

function trimBody(body: string): string {
  const trimmed = body.trim();
  if (trimmed.length <= MAX_BODY_CHARS) return trimmed;
  return `${trimmed.slice(0, MAX_BODY_CHARS).trimEnd()}…`;
}

/** Plain-text article payload for WhatsApp, clipboard, and Web Share API. */
export function buildInsightShareText(input: InsightShareInput): string {
  const { title, publishedAt, excerpt, body, url, siteName = "Universe Security" } = input;
  const parts = [title, publishedAt, "", excerpt.trim()];

  const articleBody = trimBody(body);
  if (articleBody) {
    parts.push("", articleBody);
  }

  parts.push("", "———", `Read the full article:`, url, `— ${siteName}`);
  return parts.join("\n");
}

/** WhatsApp message with link first (reliable tap target) plus full article text. */
export function buildWhatsAppInsightShareText(input: InsightShareInput): string {
  const { title, publishedAt, excerpt, body, url, siteName = "Universe Security" } = input;
  const header = [`${title}`, publishedAt, url, "", excerpt.trim()].filter(Boolean).join("\n");
  const articleBody = trimBody(body);
  const footer = articleBody ? `\n\n${articleBody}\n\n— ${siteName}` : `\n\n— ${siteName}`;
  return `${header}${footer}`;
}

export function buildWhatsAppInsightShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildFacebookInsightShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&display=popup`;
}
