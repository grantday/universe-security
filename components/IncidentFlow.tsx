"use client";

import { motion } from "framer-motion";
import { Bell, Building2, Car, CheckCircle2, Radio } from "lucide-react";

const steps = [
  { key: "alarm", label: "Alarm", icon: Bell },
  { key: "control", label: "Control Room", icon: Building2 },
  { key: "dispatch", label: "Dispatch", icon: Radio },
  { key: "response", label: "Response", icon: Car },
  { key: "resolution", label: "Resolution", icon: CheckCircle2 },
] as const;

export function IncidentFlow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "py-4" : "py-10"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-between sm:gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex flex-1 min-w-[140px] flex-col items-center rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="mt-3 text-sm font-semibold text-brand-900">{step.label}</p>
              {i < steps.length - 1 && (
                <span className="mt-2 hidden text-xs font-medium text-slate-400 sm:block" aria-hidden>
                  →
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-8 text-center text-sm text-slate-600">
          Every signal is logged, escalated, and closed with a full audit trail.
        </p>
      )}
    </div>
  );
}
