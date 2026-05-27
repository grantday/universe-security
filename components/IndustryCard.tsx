import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { getIcon } from "@/lib/content/icons";
import type { IconKey } from "@/lib/content/schema";
import { industryImageTheme } from "@/lib/themed-images";

type Props = {
  title: string;
  blurb: string;
  icon?: LucideIcon;
  iconKey?: IconKey;
  imageUrl?: string;
};

export function IndustryCard({ title, blurb, icon, iconKey, imageUrl }: Props) {
  const Icon = icon ?? getIcon(iconKey ?? "building2");
  const theme = industryImageTheme(title);

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-card transition-shadow hover:shadow-soft">
      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <PlaceholderImage seed={title} label={title} theme={theme} className="h-full w-full" />
        )}
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-brand-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{blurb}</p>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        Talk to us
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </article>
  );
}
