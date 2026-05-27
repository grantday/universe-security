/** Decorative double-U motif inspired by brand mark — not the logo asset. */
export function HeroShieldMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 20 C140 20 170 55 170 100 V130 C170 185 140 220 100 220 C60 220 30 185 30 130 V100 C30 55 60 20 100 20 Z"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.12"
      />
      <path
        d="M100 48 C124 48 142 68 142 96 V124 C142 162 124 182 100 182 C76 182 58 162 58 124 V96 C58 68 76 48 100 48 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.08"
      />
    </svg>
  );
}
