"use client";

import { useEffect, useMemo, useState } from "react";
import type { FlowStep } from "@/lib/payload/map-content";

type Kpi = {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
};

type Props = {
  steps: FlowStep[];
  kpis: Kpi[];
};

const PHASES = ["Alarm", "Acknowledged", "Dispatch", "On site", "Resolved"] as const;

export function ControlCentreSimulator({ steps, kpis }: Props) {
  const [phase, setPhase] = useState(0);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const activeStep = steps[Math.min(phase, steps.length - 1)];

  const timeline = useMemo(() => {
    const base = clock.getTime();
    return PHASES.map((label, i) => ({
      label,
      time: new Date(base - (PHASES.length - 1 - i) * 4 * 60 * 1000).toLocaleTimeString("en-ZW", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      active: i === phase,
      done: i < phase,
    }));
  }, [clock, phase]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-brand-900 p-6 text-white shadow-soft"
      aria-label="Illustrative control room operations panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Operations console</p>
          <p className="text-sm font-semibold">Incident #{String(clock.getTime()).slice(-6)}</p>
        </div>
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">Monitoring active</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {(kpis.length ? kpis.slice(0, 3) : [{ label: "Avg response", value: "8", suffix: " min" }]).map((k) => (
          <div key={k.label} className="rounded-lg bg-white/5 p-3">
            <p className="text-xs text-white/50">{k.label}</p>
            <p className="mt-1 font-display text-xl font-bold">
              {k.prefix}
              {k.value}
              {k.suffix}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-brand">Live incident flow</p>
        <p className="mt-2 font-display text-lg font-bold">{activeStep?.title ?? PHASES[phase]}</p>
        <p className="mt-1 text-sm text-white/70">{activeStep?.body ?? "Coordinated response through the control centre."}</p>
        <ol className="mt-4 flex flex-wrap gap-2">
          {timeline.map((t) => (
            <li
              key={t.label}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                t.active ? "bg-amber-brand text-brand-900" : t.done ? "bg-white/20 text-white" : "bg-white/5 text-white/50"
              }`}
            >
              {t.label} · {t.time}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 text-center text-xs text-white/45">
        Illustrative simulator — timings cycle for demonstration. Real incidents follow your escalation SOP.
      </p>
    </div>
  );
}
