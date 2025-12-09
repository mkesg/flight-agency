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
        primary: "#4f5bd5",
        "card-bg": "#333333",
        "page-bg": "#2a2a2a",
      },
      fontFamily: {
        sans: ["Segoe UI", "Roboto", "Oxygen", "Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

