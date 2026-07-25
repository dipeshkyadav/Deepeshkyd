import type { Config } from "tailwindcss"

/**
 * Design tokens from the master prompt (§2), wired 1:1 into Tailwind.
 * The raw values live in app/globals.css as CSS custom properties so the
 * theme toggle (Phase 3) can animate them without touching this file.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          light: "var(--bg-light)",
          dark: "var(--bg-dark)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          dark: "var(--surface-dark)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          ondark: "var(--text-on-dark)",
        },
        brand: {
          purple: "var(--accent-purple)",
          "purple-light": "var(--accent-purple-light)",
          black: "var(--accent-black)",
          red: "var(--accent-red)",
        },
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-panel": "var(--gradient-panel)",
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 15 20 / 0.06), 0 4px 12px rgb(15 15 20 / 0.06)",
        lift: "0 4px 8px rgb(15 15 20 / 0.08), 0 12px 24px rgb(15 15 20 / 0.10)",
        glow: "0 0 32px rgb(124 58 237 / 0.35)",
      },
      fontFamily: {
        // Bold display — poster headline style ("CONTENT CREATOR")
        display: ["var(--font-display)", "sans-serif"],
        // Thin script accent — Poster 1's "Professional". One or two words max.
        script: ["var(--font-script)", "cursive"],
        // Condensed emphasis caps — Poster 2's "DOCUMENT MY LIFE". Eyebrows/callouts only.
        condensed: ["var(--font-condensed)", "sans-serif"],
        // Body
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.03em", // tight tracking for the bold display face
        stretched: "0.18em", // the slightly stretched condensed-caps treatment
      },
    },
  },
  plugins: [],
}

export default config
