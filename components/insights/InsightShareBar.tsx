"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Facebook } from "lucide-react";
import {
  buildFacebookInsightShareUrl,
  buildWhatsAppInsightShareText,
  buildWhatsAppInsightShareUrl,
} from "@/lib/share/insight-share";
import { cn } from "@/lib/cn";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type Props = {
  shareText: string;
  whatsappShareText: string;
  pageUrl: string;
  title: string;
};

export function InsightShareBar({ shareText, whatsappShareText, pageUrl, title }: Props) {
  const [status, setStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const clearStatusSoon = useCallback(() => {
    window.setTimeout(() => setStatus(null), 5000);
  }, []);

  async function copyArticle() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
      return true;
    } catch {
      setStatus("Could not copy automatically. Use the buttons below to share.");
      clearStatusSoon();
      return false;
    }
  }

  function shareWhatsApp() {
    const url = buildWhatsAppInsightShareUrl(whatsappShareText);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("Opening WhatsApp with the full article text.");
    clearStatusSoon();
  }

  async function shareFacebook() {
    await copyArticle();
    const fbUrl = buildFacebookInsightShareUrl(pageUrl);
    window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
    setStatus("Full article copied. Paste it into your Facebook post, or use the link preview.");
    clearStatusSoon();
  }

  async function shareNative() {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: shareText, url: pageUrl });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }
    await copyArticle();
    setStatus("Article copied to your clipboard.");
    clearStatusSoon();
  }

  const buttonClass =
    "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-surface p-5 sm:p-6">
      <p className="text-sm font-semibold text-slate-900">Share this insight</p>
      <p className="mt-1 text-sm text-slate-600">
        Share the full article text — not just the link — on WhatsApp or Facebook.
      </p>
      <a
        href={pageUrl}
        className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-900 hover:underline"
      >
        Open full article on website
      </a>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={cn(buttonClass, "border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366]/5")} onClick={shareWhatsApp}>
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </button>
        <button type="button" className={cn(buttonClass, "text-[#1877F2] hover:bg-[#1877F2]/5")} onClick={() => void shareFacebook()}>
          <Facebook className="h-4 w-4" aria-hidden />
          Facebook
        </button>
        <button type="button" className={buttonClass} onClick={() => void shareNative()}>
          <Copy className="h-4 w-4" aria-hidden />
          {canNativeShare ? "Share…" : "Copy article"}
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => void copyArticle()}
          aria-label="Copy full article text"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? "Copied" : "Copy text"}
        </button>
      </div>
      {status ? (
        <p className="mt-3 text-sm text-slate-600" role="status">
          {status}
        </p>
      ) : null}
    </div>
  );
}
