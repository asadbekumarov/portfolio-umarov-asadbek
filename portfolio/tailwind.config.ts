import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        // Remap the entire indigo scale to the sky-blue family (#0284c7).
        // Every Tailwind utility that references indigo-* (text, bg, border,
        // ring, stroke, fill, opacity-modifier variants like bg-indigo-500/20)
        // will now automatically use our new palette — no template changes needed.
        indigo: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#e2e8f0", // light text colour (hover states, muted accents)
          400: "#0284c7", // primary blue — hover text & icon accents
          500: "#0284c7", // primary blue — bg, border, ring utilities
          600: "#0369a1", // slightly darker blue — pressed / active states
          700: "#0d2138", // deep surface blue
          800: "#0e1628", // darker surface
          900: "#030712", // near-black background
          950: "#030712",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
