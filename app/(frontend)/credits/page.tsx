import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Stock photography sources used on this site.",
};

export default function CreditsPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-brand-900">Image credits</h1>
        <p className="mt-4 text-slate-600">
          Marketing photos are stored locally under <code className="text-sm">/public/images</code> and sourced from
          Pexels (free licence). Replace any image with your own brand photography via Universe Studio or Payload media
          when you have approved assets.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-hairline">
          <p className="font-semibold text-slate-900">Pexels</p>
          <p className="mt-2 text-sm text-slate-600">
            Source:{" "}
            <a className="font-semibold text-brand-700 hover:underline" href="https://www.pexels.com/">
              https://www.pexels.com/
            </a>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Pexels licence allows free use; attribution is appreciated but not required. Individual photographers are
            credited on Pexels.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-sm font-semibold text-brand-700 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
