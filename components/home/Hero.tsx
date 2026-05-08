"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";
import { Shield } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,91,168,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
      <div className="container-page relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-hairline">
              <Shield className="h-3.5 w-3.5 text-brand-700" aria-hidden />
              Zimbabwe · 24/7 control centre
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-700 sm:text-xl">
              Integrated protection services for residential, commercial, and industrial environments — with
              centralised monitoring and rapid response you can trust.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary">
                Request security assessment
              </Button>
              <Link
                href={`tel:${siteConfig.emergencyPhone}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-hairline hover:bg-slate-50"
              >
                Emergency response
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative aspect-[4/3] w-full">
              <PlaceholderImage
                seed="home-control-room"
                label="Control room monitoring"
                theme="controlRoom"
                className="h-full w-full"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Control-room-led operations with dispatch workflows and full audit trails.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
