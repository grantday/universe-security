"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { buildAdjacentLayers, LAYER_STYLES, type LayerRole } from "@/lib/hero/layered-slider";
import { themedLocalImageUrl } from "@/lib/themed-images";
import type { HeroSlide } from "@/lib/content/schema";
import { cn } from "@/lib/cn";

function slideImageSrc(slide: HeroSlide) {
  return slide.imageUrl?.trim() || themedLocalImageUrl(slide.theme);
}

function SlideCard({
  slide,
  role,
  reduceMotion,
  priority,
}: {
  slide: HeroSlide;
  role: LayerRole;
  reduceMotion: boolean;
  priority?: boolean;
}) {
  const style = LAYER_STYLES[role];
  const isActive = role === "active";

  return (
    <motion.div
      layout={!reduceMotion}
      initial={false}
      animate={{
        scale: style.scale,
        opacity: style.opacity,
        x: style.x,
        y: style.y,
        rotate: style.rotate,
      }}
      transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute inset-0 origin-center overflow-hidden rounded-2xl shadow-2xl",
        isActive ? "ring-1 ring-white/25" : "ring-1 ring-white/10",
      )}
      style={{ zIndex: style.zIndex }}
    >
      <Image
        src={slideImageSrc(slide)}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 80vw, 420px"
        priority={priority && isActive}
      />
    </motion.div>
  );
}

export function LayeredHeroCards({
  slides,
  index,
  reduceMotion,
}: {
  slides: HeroSlide[];
  index: number;
  reduceMotion: boolean;
}) {
  const safeSlides = Array.isArray(slides) ? slides : [];
  const layers = buildAdjacentLayers(safeSlides, index);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] sm:aspect-[3/4] lg:max-w-[440px]">
      {layers.map(({ slide, role }) => (
        <SlideCard
          key={`${slide.id}-${role}`}
          slide={slide}
          role={role}
          reduceMotion={reduceMotion}
          priority={role === "active"}
        />
      ))}
    </div>
  );
}
