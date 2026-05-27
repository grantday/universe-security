import { LOGO_INK_CLASS } from "@/lib/brand";
import { cn } from "@/lib/cn";

type Props = {
  onDark?: boolean;
  className?: string;
};

/** Nested double-U mark matching the bundled Universe Security wordmark. */
export function UniverseLogoMark({ onDark = false, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={cn("h-9 w-9 shrink-0", onDark ? "text-white" : LOGO_INK_CLASS, className)}
    >
      <path
        d="M8.5 11c0-1.1.9-2 2-2h19c1.1 0 2 .9 2 2v12.2c0 6.9-4.8 12.8-11.5 13.8C13.3 36 8.5 30.1 8.5 23.2V11z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M14 15.5c0-.8.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5v7.8c0 4.6-3.1 8.6-7.5 9.4-4.4-.8-7.5-4.8-7.5-9.4v-7.8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
