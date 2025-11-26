// tailwind.config.ts
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
        // Mendaftarkan variable CSS kita
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Pastikan font ini sesuai dgn yang di layout.tsx
        sans: ["var(--font-inter)"], 
        mono: ["var(--font-space)"],
        syne: ["var(--font-syne)"], // Font judul keren kita
      },
      // ... (sisa config lain seperti keyframes biarkan)
    },
  },
  plugins: [],
};
export default config;