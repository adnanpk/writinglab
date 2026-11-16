import type { Config } from "tailwindcss";
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // semantic tokens (flip in dark mode)
        ink: v("ink"), page: v("bg"), mist: v("mist"), surface: v("surface"), line: v("line"), muted: v("muted"),
        // brand accents (accent colour is user-switchable)
        cobalt: { DEFAULT: v("accent"), dark: v("accent-dark"), fg: v("accent-fg") },
        sky: { brand: v("sky") },
        emerald: { brand: v("emerald") },
        navy: "#0F172A", // always-dark surface (hero panels, footer)
      },
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-arabic)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-arabic)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { fadeUp: "fadeUp .35s ease-out both" },
    },
  },
  plugins: [],
};
export default config;
