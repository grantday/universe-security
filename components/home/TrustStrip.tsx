"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Radio, ShieldCheck, Users } from "lucide-react";

const items = [
  { icon: Clock, label: "24/7 Monitoring" },
  { icon: Radio, label: "Rapid Response Units" },
  { icon: ShieldCheck, label: "Licensed Security Personnel" },
  { icon: MapPin, label: "Real-Time Tracking" },
  { icon: Users, label: "Multi-Site Coverage" },
] as const;

export function TrustStrip() {
  return (
    <section className="border-b border-slate-100 bg-white py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:text-sm">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
