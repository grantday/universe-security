"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Building2, Factory, Home } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import type { ServiceCard as ServiceCardType } from "@/lib/content/schema";
import type { ImageTheme } from "@/lib/themed-images";

const themeIcons = {
  residential: Home,
  business: Building2,
  industrial: Factory,
} as const;

function iconForTheme(theme: ImageTheme) {
  if (theme === "residential") return Home;
  if (theme === "business") return Building2;
  if (theme === "industrial") return Factory;
  return Building2;
}

export function ServicesSlider({ services }: { services: ServiceCardType[] }) {
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((card) => (
          <div key={card.title} data-slide className="w-[min(100%,340px)] shrink-0 snap-start sm:w-[360px]">
            <ServiceCard
              title={card.title}
              description={card.description}
              items={card.items}
              icon={iconForTheme(card.theme)}
              theme={card.theme}
              imageUrl={card.imageUrl || undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
