"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Universe Security integrated our alarm, CCTV, and patrol response into one control view. We finally have clarity when something happens after hours.",
    author: "Operations Director",
    org: "Commercial property, Harare",
  },
  {
    quote:
      "Their control room keeps us informed in real time. Response teams arrive quickly and reporting is consistent — exactly what our logistics hub needed.",
    author: "Site Manager",
    org: "Industrial client, Zimbabwe",
  },
  {
    quote:
      "Professional guards, clear escalation paths, and a team that understands residential estates. We recommend them for multi-site coverage.",
    author: "Estate Chairperson",
    org: "Residential estate",
  },
] as const;

export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-100 bg-white p-8 shadow-soft sm:p-10">
      <Quote className="h-8 w-8 text-brand-200" aria-hidden />
      <blockquote className="mt-4 text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm text-slate-600">
        <span className="font-semibold text-brand-900">{t.author}</span>
        <span className="text-slate-400"> · </span>
        {t.org}
      </figcaption>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-1" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === i}
              className={`h-2 w-8 rounded-full transition-colors ${
                idx === i ? "bg-brand-700" : "bg-slate-200 hover:bg-slate-300"
              }`}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-brand-900 hover:bg-slate-50"
            aria-label="Previous testimonial"
            onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-brand-900 hover:bg-slate-50"
            aria-label="Next testimonial"
            onClick={() => setI((v) => (v + 1) % testimonials.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        Sample testimonials for demonstration — replace with verified client feedback.
      </p>
    </div>
  );
}
