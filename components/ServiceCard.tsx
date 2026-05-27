import type { LucideIcon } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import type { ImageTheme } from "@/lib/themed-images";

type Props = {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  theme: ImageTheme;
  imageUrl?: string;
};

export function ServiceCard({ title, description, items, icon: Icon, theme, imageUrl }: Props) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-card">
      <div className="mb-5 aspect-[16/10] w-full">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-full w-full rounded-xl object-cover" />
        ) : (
          <PlaceholderImage seed={title} label={title} theme={theme} className="h-full w-full" />
        )}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-amber" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
