import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff", 100: "#dce7fd", 500: "#3b6ef0",
          600: "#2b55d8", 700: "#2343b0", 900: "#16265e",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
