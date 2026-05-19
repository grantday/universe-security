"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { SiteContent } from "@/lib/content/schema";

export function TestimonialSlider({ testimonials }: { testimonials: SiteContent["testimonials"] }) {
  const [i, setI] = useState(0);
  const t = testimonials[i] ?? testimonials[0]!;

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  function go(delta: number) {
    setI((v) => (v + delta + testimonials.length) % testimonials.length);
  }

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-8 shadow-soft sm:p-10">
      <Quote className="h-8 w-8 text-brand-200" aria-hidden />
      <blockquote className="mt-4 text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <footer className="mt-6">
        <p className="font-semibold text-brand-900">{t.author}</p>
        <p className="text-sm text-slate-600">{t.org}</p>
      </footer>
      {testimonials.length > 1 ? (
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 w-8 rounded-full transition-colors ${idx === i ? "bg-brand-700" : "bg-slate-200"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
