"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/Button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import type { HeroSlide } from "@/lib/content/schema";

export function HomeHeroSlider({ slides }: { slides: HeroSlide[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const pausedRef = useRef(false);
  const [tick, setTick] = useState(0);

  const active = slides[index] ?? slides[0]!;

  function go(next: number) {
    const n = (next + slides.length) % slides.length;
    setDir(next > index ? 1 : -1);
    setIndex(n);
  }

  function next() {
    go(index + 1);
  }

  function prev() {
    go(index - 1);
  }

  useEffect(() => {
    if (reduceMotion) return;
    setTick(0);
    const id = window.setInterval(() => {
      if (!pausedRef.current) next();
    }, 7500);
    return () => window.clearInterval(id);
  }, [index, reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setTick((t) => (t + 1) % 1000000);
    }, 120);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const accent =
    active.id === "control"
      ? "from-brand-100/70"
      : active.id === "guards"
        ? "from-slate-100/70"
        : "from-brand-50/70";

  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: (d: 1 | -1) => ({ opacity: 0, x: d * 24 }),
        animate: { opacity: 1, x: 0 },
        exit: (d: 1 | -1) => ({ opacity: 0, x: d * -24 }),
      };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,91,168,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accent} to-transparent`} />

      <div
        className="container-page relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-hairline">
              <Shield className="h-3.5 w-3.5 text-brand-700" aria-hidden />
              {active.eyebrow}
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: "easeOut" }}
              >
                <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {active.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">{active.body}</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={active.ctaPrimary.href} variant="primary">
                    {active.ctaPrimary.label}
                  </Button>
                  {active.ctaSecondary.href.startsWith("tel:") ? (
                    <Link
                      href={active.ctaSecondary.href}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-hairline hover:bg-slate-50"
                    >
                      {active.ctaSecondary.label}
                    </Link>
                  ) : (
                    <Button href={active.ctaSecondary.href} variant="secondary">
                      {active.ctaSecondary.label}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-xs font-semibold text-slate-500">
                  {index + 1} / {slides.length}
                  <span className="text-slate-300"> · </span>
                  <span className="font-medium text-slate-500">Auto</span>
                </p>
                <div className="flex gap-2" role="tablist" aria-label="Hero slides">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => go(i)}
                    className={`h-2.5 w-10 rounded-full transition-colors ${
                      i === index ? "bg-brand-700" : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-hairline hover:bg-slate-50"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-hairline hover:bg-slate-50"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-3 h-1.5 w-full max-w-[420px] overflow-hidden rounded-full bg-slate-200/80">
              <motion.div
                key={`${active.id}-progress-${tick}`}
                initial={{ width: "0%" }}
                animate={{ width: pausedRef.current || reduceMotion ? "0%" : "100%" }}
                transition={{ duration: pausedRef.current || reduceMotion ? 0 : 7.5, ease: "linear" }}
                className="h-full rounded-full bg-brand-700"
              />
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`${active.id}-img`}
                custom={dir}
                variants={reduceMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : { initial: (d: 1 | -1) => ({ opacity: 0, y: 14 }), animate: { opacity: 1, y: 0 }, exit: (d: 1 | -1) => ({ opacity: 0, y: -14 }) }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: "easeOut" }}
                className="relative aspect-[4/3] w-full"
              >
                <PlaceholderImage
                  seed={active.seed}
                  label={active.title}
                  theme={active.theme}
                  className="h-full w-full"
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-sm font-medium text-slate-600">
              {active.id === "control"
                ? "Control-room-led operations with dispatch workflows and full audit trails."
                : active.id === "guards"
                  ? "Professional on-site presence aligned to your environment and operational needs."
                  : "Technology-led monitoring to reduce blind spots and speed up response."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

