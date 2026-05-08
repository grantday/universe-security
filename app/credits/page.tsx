import type { Metadata } from "next";
import Link from "next/link";
import { ccImages } from "@/lib/cc-images";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Creative Commons image credits used on this site.",
};

export default function CreditsPage() {
  const items = Object.entries(ccImages);
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Image credits</h1>
        <p className="mt-4 text-slate-600">
          The following images are used under Creative Commons licenses. Replace these with your approved brand
          imagery when ready.
        </p>

        <ul className="mt-10 space-y-5">
          {items.map(([key, img]) => (
            <li key={key} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-hairline">
              <p className="font-semibold text-slate-900">{img.alt}</p>
              <p className="mt-1 text-sm text-slate-600">
                Author: {img.author}
                <span className="text-slate-400"> · </span>
                License:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={img.licenseUrl}>
                  {img.licenseName}
                </a>
              </p>
              <p className="mt-2 text-sm">
                Source:{" "}
                <a className="font-semibold text-brand-700 hover:underline" href={img.sourceUrl}>
                  {img.sourceUrl}
                </a>
              </p>
              <p className="mt-2 text-xs text-slate-500 break-all">{img.src}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/" className="text-sm font-semibold text-brand-700 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

