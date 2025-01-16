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
        background: "#090909", // Dark background
        foreground: "#ffffff", // White text
        primary: "#7c3aed", // Purple
        secondary: "#a855f7", // Purple shade for gradients
        accent: "#22d3ee", // Cyan
        danger: "#ef4444", // Red
        warning: "#facc15", // Yellow
        success: "#4ade80", // Green
      },
    },
  },
  plugins: [],
} satisfies Config;
