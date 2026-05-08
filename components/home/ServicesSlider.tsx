"use client";

import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { Building2, Factory, Home } from "lucide-react";

export function ServicesSlider() {
  const ref = useRef<HTMLDivElement>(null);

  const cards = useMemo(
    () => [
      {
        title: "Home Security",
        description: "Residential protection with smart integration and panic pathways.",
        icon: Home,
        items: ["Alarm systems & monitoring", "CCTV & perimeter protection", "Smart integration", "Panic response"],
      },
      {
        title: "Business Security",
        description: "Commercial coverage with access control and transparent reporting.",
        icon: Building2,
        items: ["Guarding & patrols", "Access control", "CCTV monitoring", "Risk assessments & asset protection"],
      },
      {
        title: "Industrial Security",
        description: "High-risk environments, logistics, and loss prevention.",
        icon: Factory,
        items: ["Site guarding", "Logistics escort", "High-risk protection", "Loss prevention"],
      },
    ],
    []
  );

  function scrollByCards(dir: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    const child = el.querySelector<HTMLElement>("[data-slide]");
    const w = child?.offsetWidth ?? 360;
    el.scrollBy({ left: dir * (w + 24), behavior: "smooth" });
  }

  return (
    <div className="relative mt-10">
      <div className="absolute -top-14 right-0 hidden gap-2 lg:flex">
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-hairline hover:bg-slate-50"
          aria-label="Previous services"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-hairline hover:bg-slate-50"
          aria-label="Next services"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cards.map((c) => (
          <div
            key={c.title}
            data-slide
            className="w-[85%] shrink-0 sm:w-[70%] lg:w-[calc((100%-48px)/3)]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ServiceCard title={c.title} description={c.description} icon={c.icon} items={c.items} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-600 lg:hidden">Swipe to browse services.</p>
    </div>
  );
}

