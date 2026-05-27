"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LayeredHeroCards } from "@/components/home/LayeredHeroCards";
import { HeroShieldMotif } from "@/components/home/HeroShieldMotif";
import { Button } from "@/components/Button";
import { AUTOPLAY_MS } from "@/lib/hero/layered-slider";
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
    const id = window.setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setTick((t) => (t + 1) % 1000000);
    }, 120);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const textVariants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: (d: 1 | -1) => ({ opacity: 0, x: d * 20 }),
        animate: { opacity: 1, x: 0 },
        exit: (d: 1 | -1) => ({ opacity: 0, x: d * -16 }),
      };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-brand-900 to-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(30,91,168,0.35),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,_rgba(245,158,11,0.08),_transparent_45%)]" />
      <HeroShieldMotif className="pointer-events-none absolute -right-8 top-8 h-64 w-52 text-white opacity-30 sm:h-80 sm:w-64" />
      <HeroShieldMotif className="pointer-events-none absolute -left-16 bottom-0 h-48 w-40 text-white opacity-20" />

      <div
        className="container-page relative pb-14 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" aria-hidden />
              {active.eyebrow}
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active.id}
                custom={dir}
                variants={textVariants}
                initial={false}
                animate="animate"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: "easeOut" }}
              >
                <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                  {active.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{active.body}</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={active.ctaPrimary.href} variant="primary" className="!bg-white !text-brand-900 hover:!bg-white/90">
                    {active.ctaPrimary.label}
                  </Button>
                  {active.ctaSecondary.href.startsWith("tel:") ? (
                    <Link
                      href={active.ctaSecondary.href}
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      {active.ctaSecondary.label}
                    </Link>
                  ) : (
                    <Link
                      href={active.ctaSecondary.href}
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      {active.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="text-xs font-semibold text-white/50">
                {index + 1} / {slides.length}
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
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-10 bg-white" : "w-6 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-4 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/15">
              <motion.div
                key={`${active.id}-progress-${tick}`}
                initial={{ width: "0%" }}
                animate={{ width: pausedRef.current || reduceMotion ? "0%" : "100%" }}
                transition={{ duration: pausedRef.current || reduceMotion ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                className="h-full rounded-full bg-amber-brand"
              />
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cards-${index}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.45 }}
              >
                <LayeredHeroCards slides={slides} index={index} reduceMotion={!!reduceMotion} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 hidden text-sm font-medium text-white/70 lg:block">
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
