import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        foreground: "#ffffff",
        primary: "#7c3aed",
        secondary: "#a855f7",
        accent: "#22d3ee",
        danger: "#ef4444",
        warning: "#facc15",
        success: "#4ade80",
        gray: {
          900: "#0B0B0F",
          800: "#151519",
          700: "#1F1F24",
          600: "#2C2C33",
          500: "#3A3A42",
          400: "#9898A3",
          300: "#AFAFB7",
          200: "#C6C6CC",
          100: "#DDDDE0",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
