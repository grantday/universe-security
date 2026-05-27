import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Bell, Lock, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Store",
  description:
    "Universe Security store — security equipment, accessories, and monitoring packages coming soon.",
};

const PRODUCTS = [
  {
    icon: ShieldCheck,
    label: "Guard equipment",
    detail: "Torches, batons, PPE, and branded uniforms.",
  },
  {
    icon: Bell,
    label: "Alarm systems",
    detail: "Residential and commercial alarm panels and sensors.",
  },
  {
    icon: Lock,
    label: "Access control",
    detail: "Card readers, biometrics, and gate hardware.",
  },
  {
    icon: ShoppingBag,
    label: "Monitoring packages",
    detail: "Control-room subscription bundles tailored to your site.",
  },
];

export default function StorePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-900 text-white">
      {/* Background — security-themed photo with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/control-room.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
        />
        {/* Deep gradient to keep text legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-900/75 to-brand-800/80" />
        {/* Subtle grid pattern overlay */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Shield watermark */}
      <div className="pointer-events-none absolute -right-24 -top-24 opacity-[0.06]">
        <ShieldCheck className="h-[480px] w-[480px]" strokeWidth={0.6} />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
          <ShoppingBag className="h-3.5 w-3.5" />
          Coming soon
        </span>

        <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Universe Security
          <span className="mt-2 block text-brand-300">Online Store</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          We&apos;re building a shop where you can order security equipment, alarm
          systems, access-control hardware, and monitoring packages — all backed by
          our 24/7 control room.
        </p>

        {/* Coming-soon product teaser grid */}
        <div className="mt-14 grid w-full gap-4 sm:grid-cols-2">
          {PRODUCTS.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/40">
                <Icon className="h-5 w-5 text-brand-300" aria-hidden />
              </div>
              <div>
                <p className="font-display font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-sm text-white/60">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <p className="mt-14 text-sm text-white/50">
          Want to be notified when the store launches?{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-300 underline underline-offset-2 hover:text-white"
          >
            Get in touch
          </Link>{" "}
          and we&apos;ll let you know.
        </p>

        {/* Back link */}
        <Link
          href="/"
          className="mt-8 text-xs font-medium text-white/40 hover:text-white/70"
        >
          ← Back to Universe Security
        </Link>
      </div>
    </div>
  );
}
