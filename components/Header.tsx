"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-config";
import { UniverseLogo } from "@/components/brand/UniverseLogo";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import type { BrandingInfo, SiteInfo } from "@/lib/content/site-types";

export function SiteHeader({ site, branding }: { site: SiteInfo; branding: BrandingInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const onHomeTop = pathname === "/" && !scrolled;
  const shellClass =
    open
      ? "border-b border-slate-200 bg-white shadow-hairline"
      : onHomeTop
        ? "border-b border-white/10 bg-navy-dark/80 backdrop-blur-md"
        : scrolled
          ? "border-b border-slate-200 bg-white shadow-hairline backdrop-blur-lg"
          : "border-b border-transparent bg-white backdrop-blur-sm";

  return (
    <div className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", shellClass)}>
      <div className="relative">
      <motion.div className="container-page flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-display text-base font-bold tracking-tight">
          <UniverseLogo
            logoUrl={branding.logoUrl}
            alt={site.name}
            onDark={onHomeTop && !open}
            className={cn(onHomeTop ? "max-w-[170px]" : "max-w-[160px]")}
          />
          <span className="sr-only">{site.name}</span>
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
                  active
                    ? onHomeTop
                      ? "text-white"
                      : "text-brand-900"
                    : onHomeTop
                      ? "text-white/80 hover:text-white"
                      : "text-slate-700 hover:text-brand-900"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-amber-brand transition-transform group-hover:scale-x-100",
                    active && "scale-x-100",
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
            href={`tel:${site.emergencyPhone}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emergency px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-red-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Emergency 24/7
          </a>
        </motion.div>

        <button
          type="button"
          className={cn("inline-flex rounded-lg p-2 lg:hidden", onHomeTop && !open ? "text-white" : "text-navy")}
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
              className="fixed inset-0 top-[68px] z-40 bg-navy/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-full z-50 flex max-h-[min(70vh,calc(100dvh-68px))] flex-col overflow-y-auto border-b border-border bg-white shadow-2xl lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
                {navLinks.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-xl px-3 py-3 text-sm font-semibold text-slate-900 hover:bg-surface",
                        active && "bg-surface text-navy",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="space-y-2 border-t border-border bg-surface-alt px-4 py-4">
                <Link
                  href="/contact"
                  className="block rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-navy"
                >
                  Request assessment
                </Link>
                <a
                  href={`tel:${site.emergencyPhone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emergency px-4 py-3 text-sm font-semibold text-white"
                >
                  Emergency 24/7
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
      </div>
    </div>
  );
}
