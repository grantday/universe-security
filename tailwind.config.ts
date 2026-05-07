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
          500: "#1E5BA8",
          700: "#13315C",
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
      boxShadow: {
        soft: "0 4px 24px -4px rgba(11, 37, 69, 0.12)",
        card: "0 2px 16px -2px rgba(11, 37, 69, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
