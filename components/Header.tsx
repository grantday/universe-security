"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { cn } from "@/lib/cn";

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-brand-900" />
      <circle cx="16" cy="16" r="9" className="fill-none stroke-white/90" strokeWidth="1.5" />
      <path
        d="M16 9.5 20.5 12v6.5L16 21l-4.5-2.5V12L16 9.5Z"
        className="fill-amber-brand/95 stroke-white/80"
        strokeWidth="0.75"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shellClass = scrolled
    ? "border-b border-slate-200 bg-white shadow-hairline backdrop-blur-lg"
    : "border-b border-transparent bg-white backdrop-blur-sm";

  return (
    <div className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", shellClass)}>
      <motion.div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-display text-base font-bold tracking-tight text-navy">
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block">{siteConfig.name}</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted lg:block">
              Corporate security
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  active ? "text-brand-900" : "text-slate-700 hover:text-brand-900"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-amber-brand transition-transform group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <motion.div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="secondary" className="!py-2 !text-sm">
            Request assessment
          </Button>
          <a
            href={`tel:${siteConfig.emergencyPhone}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emergency px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-red-700"
          >
            <span className="relative flex h-2 w-2">
              {!reduced ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
              ) : null}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Emergency 24/7
          </a>
        </motion.div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          <span className="sr-only">Menu</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-navy/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-drawer"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-border bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-display text-sm font-bold text-navy">Menu</span>
                <button type="button" className="rounded-lg p-2 text-navy" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-900 hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <motion.div className="space-y-2 border-t border-border p-4">
                <Link
                  href="/contact"
                  className="block rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold text-navy"
                >
                  Request assessment
                </Link>
                <a
                  href={`tel:${siteConfig.emergencyPhone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emergency px-4 py-3 text-sm font-semibold text-white"
                >
                  Emergency 24/7
                </a>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
