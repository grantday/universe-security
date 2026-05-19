"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

const NextStudio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <p className="text-slate-600">Loading Studio…</p>
    </main>
  ),
});

function SetupMessage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <section className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="font-display text-2xl font-bold text-brand-900">Sanity Studio</h1>
        <p className="mt-3 text-slate-600">
          Add <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SANITY_DATASET</code> in Vercel environment
          variables, then redeploy.
        </p>
      </section>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured()) return <SetupMessage />;
  return <NextStudio config={config} />;
}
