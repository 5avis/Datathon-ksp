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
        darkBg: "#0A0E17",
        darkCard: "#0E1526",
        darkBorder: "#1E293B",
        tactical: {
          cyan: "#3E8EDE",
          cyanLight: "#4FC3F7",
          red: "#EF4444",
          redLight: "#F87171",
          green: "#10B981",
          greenLight: "#34D399",
          amber: "#F59E0B",
          amberLight: "#FBBF24",
        },
      },
    },
  },
  plugins: [],
};
export default config;

