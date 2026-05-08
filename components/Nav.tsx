"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/Button";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-slate-200/80 bg-white/95 shadow-hairline backdrop-blur-md"
          : "border-transparent bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-brand-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-sm font-black text-white">
            U
          </span>
          <span className="leading-none">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 text-slate-700 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-slate-100 text-brand-900" : "hover:bg-slate-100 hover:text-brand-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="secondary" className="!py-2 !text-sm">
            Request assessment
          </Button>
          <a
            href={`tel:${siteConfig.emergencyPhone}`}
            className="inline-flex items-center rounded-xl bg-accent-red px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
          >
            Emergency 24/7
          </a>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-brand-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-brand-900"
            >
              Request assessment
            </Link>
            <a
              href={`tel:${siteConfig.emergencyPhone}`}
              className="rounded-xl bg-accent-red px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Emergency 24/7
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
