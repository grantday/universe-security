import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EAF2FB",
          100: "#D6E7F7",
          200: "#A9CFF0",
          300: "#7BB7E8",
          400: "#4D9FE0",
          500: "#1E5BA8",
          600: "#184D93",
          700: "#13315C",
          800: "#0F2B50",
          900: "#0B2545",
        },
        navy: {
          DEFAULT: "#0B2545",
          deep: "#13315C",
          dark: "#08182F",
        },
        surface: {
          DEFAULT: "#F5F7FB",
          alt: "#FAFBFD",
        },
        border: {
          DEFAULT: "#E5E9F2",
        },
        emergency: "#D7263D",
        amber: {
          DEFAULT: "#F4B400",
          brand: "#F59E0B",
        },
        ink: {
          DEFAULT: "#1A2238",
          muted: "#5A6478",
        },
        accent: {
          amber: "#F59E0B",
          red: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.1rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(2, 6, 23, 0.25)",
        card: "0 8px 22px -14px rgba(2, 6, 23, 0.22)",
        hairline: "0 1px 0 rgba(15, 23, 42, 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
