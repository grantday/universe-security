import Image from "next/image";
import type { ClientLogoItem } from "@/lib/payload/trust-content";

type Props = {
  logos: ClientLogoItem[];
  label?: string;
};

export function LogoMarquee({ logos, label = "Trusted across sectors" }: Props) {
  const track = [...logos, ...logos];

  return (
    <section aria-label="Trusted by organisations across Zimbabwe" className="border-y border-slate-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <div className="group/marquee relative mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
            {track.map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                className="inline-flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-600"
              >
                {item.logoUrl ? (
                  <Image src={item.logoUrl} alt="" width={80} height={28} className="h-7 w-auto object-contain" />
                ) : null}
                <span>{item.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
