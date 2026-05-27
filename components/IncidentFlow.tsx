"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/content/icons";
import type { FlowStep } from "@/lib/payload/map-content";

const defaultSteps: FlowStep[] = [
  { title: "Alarm", body: "Signal received", icon: "radio" },
  { title: "Control Room", body: "Operator triage", icon: "building2" },
  { title: "Dispatch", body: "Unit assigned", icon: "radio" },
  { title: "Response", body: "On-site action", icon: "truck" },
  { title: "Resolution", body: "Closed with audit", icon: "check" },
];

export function IncidentFlow({
  compact = false,
  steps,
  variant = "light",
}: {
  compact?: boolean;
  steps?: FlowStep[];
  variant?: "light" | "dark";
}) {
  const flow = steps?.length ? steps : defaultSteps;
  const dark = variant === "dark";

  return (
    <div className={compact ? "py-4" : "py-10"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-between sm:gap-3">
        {flow.map((step, i) => {
          const Icon = getIcon(step.icon);
          return (
            <motion.div
              key={`${step.title}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className={`flex min-w-[140px] flex-1 flex-col items-center rounded-2xl p-4 text-center ${
                dark
                  ? "border border-white/10 bg-white/5 backdrop-blur-sm"
                  : "border border-slate-100 bg-white shadow-card"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  dark ? "bg-brand-500/20 text-brand-200" : "bg-brand-50 text-brand-700"
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className={`mt-3 text-sm font-semibold ${dark ? "text-white" : "text-brand-900"}`}>{step.title}</p>
              {step.body ? (
                <p className={`mt-1 text-xs ${dark ? "text-white/60" : "text-slate-500"}`}>{step.body}</p>
              ) : null}
              {i < flow.length - 1 && (
                <span
                  className={`mt-2 hidden text-xs font-medium sm:block ${dark ? "text-white/40" : "text-slate-400"}`}
                  aria-hidden
                >
                  →
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      {!compact && (
        <p className={`mt-8 text-center text-sm ${dark ? "text-white/70" : "text-slate-600"}`}>
          Every signal is logged, escalated, and closed with a full audit trail.
        </p>
      )}
    </div>
  );
}
