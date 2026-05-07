import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "emergency";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-900 text-white hover:bg-brand-700 shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  secondary:
    "bg-white text-brand-900 border border-slate-200 hover:border-brand-500 hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-500",
  emergency:
    "bg-accent-red text-white hover:bg-red-700 shadow-md focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2",
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
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

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
