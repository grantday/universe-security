import Image from "next/image";
import { isDefaultLogo, LOGO_ON_DARK_IMAGE_CLASS, resolveLogoUrl } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Props = {
  logoUrl?: string | null;
  alt?: string;
  variant?: "full" | "mark";
  className?: string;
  /** Parent background is dark — show the light ink version of the same artwork. */
  onDark?: boolean;
};

export function UniverseLogo({
  logoUrl,
  alt = "Universe Security",
  variant = "full",
  className,
  onDark = false,
}: Props) {
  const bundled = isDefaultLogo(logoUrl);
  const src = resolveLogoUrl(logoUrl, onDark);
  const useInvert = onDark && !bundled;

  if (variant === "mark") {
    return (
      <span className={cn("relative block h-9 w-10 shrink-0 overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          width={120}
          height={40}
          className={cn(
            "absolute left-0 top-1/2 h-9 w-auto max-w-none -translate-y-1/2 object-left",
            useInvert && LOGO_ON_DARK_IMAGE_CLASS,
          )}
          priority
        />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={280}
      height={56}
      className={cn(
        "h-10 w-auto max-w-[200px] shrink-0 object-contain object-left sm:max-w-[220px]",
        useInvert && LOGO_ON_DARK_IMAGE_CLASS,
        className,
      )}
      priority
    />
  );
}
