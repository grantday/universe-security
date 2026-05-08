import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "emergency";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-900 text-white hover:bg-brand-800 shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  secondary:
    "bg-white text-slate-900 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 shadow-hairline focus-visible:ring-2 focus-visible:ring-brand-500",
  emergency:
    "bg-accent-red text-white hover:bg-red-700 shadow-soft focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, "variant" | "className" | "children">;
  const { type, ...otherButtonProps } = buttonRest;
  return (
    <button
      type={type ?? "button"}
      className={`${base} ${variants[variant]} ${className}`}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
}
