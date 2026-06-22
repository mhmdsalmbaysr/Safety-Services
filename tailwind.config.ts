import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff", 100: "#d9ebff", 200: "#bcdcff", 300: "#8ec5ff",
          400: "#59a4ff", 500: "#2f80ff", 600: "#1761f5", 700: "#0f4ce1",
          800: "#133fb6", 900: "#15398f", 950: "#11245a",
        },
      },
      fontFamily: { sans: ["var(--font-cairo)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
