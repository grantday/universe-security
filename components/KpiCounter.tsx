"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export function KpiCounter({ label, value, suffix = "", prefix = "", decimals = 0, className = "" }: Props) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      done.current = true;
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || done.current) return;
        done.current = true;
        setDisplay(0);
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);

    const fallback = window.setTimeout(() => {
      if (!done.current) {
        done.current = true;
        setDisplay(value);
      }
    }, 2500);

    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, [value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("en-ZW");

  return (
    <div ref={ref} className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-card ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
        {prefix}
        {formatted}
        {suffix}
      </p>
    </div>
  );
}
