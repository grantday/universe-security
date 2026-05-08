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
    },
  },
  plugins: [],
};

export default config;
