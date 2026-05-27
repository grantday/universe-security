"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayeredHeroCards } from "@/components/home/LayeredHeroCards";
import { HeroShieldMotif } from "@/components/home/HeroShieldMotif";
import type { HeroSlide } from "@/lib/content/schema";
import { cn } from "@/lib/cn";

type Props = {
  slides: HeroSlide[];
  activeIndex: number;
  compact?: boolean;
  className?: string;
};

export function LayeredHeroPreview({ slides, activeIndex, compact = false, className }: Props) {
  const active = slides[activeIndex] ?? slides[0];
  if (!active) {
    return (
      <div className={cn("rounded-xl border border-dashed border-slate-300 bg-slate-100 p-8 text-center text-sm text-slate-500", className)}>
        Add at least one slide to preview.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-600/40 bg-gradient-to-br from-navy-dark via-brand-900 to-navy-deep text-white shadow-lg",
        compact ? "p-4" : "p-6",
        className,
      )}
    >
      <HeroShieldMotif className="pointer-events-none absolute -right-4 top-2 h-24 w-20 text-white opacity-20" />
      <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-white/50">Live preview — layered hero</p>
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "lg:grid-cols-2 lg:items-center")}>
        <div className="min-w-0 space-y-2">
          <span className="inline-block rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80">
            {active.eyebrow}
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className={cn("font-display font-bold leading-tight text-white", compact ? "text-lg" : "text-2xl")}>
                {active.title}
              </p>
              <p className={cn("mt-2 text-white/75", compact ? "line-clamp-2 text-xs" : "line-clamp-3 text-sm")}>
                {active.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={cn(compact ? "max-w-[280px]" : "")}>
          <LayeredHeroCards slides={slides} index={activeIndex} reduceMotion />
        </div>
      </div>
    </div>
  );
}
