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
        // Navy palette (homeinvest.com inspired)
        navy: {
          900: "#060E1A",
          800: "#0A1628",
          700: "#112240",
          600: "#1A3355",
          500: "#243B55",
        },
        // Gold accent
        gold: {
          bright: "#F0B429",
          primary: "#C9993A",
          muted: "#8B6B25",
        },
        // Status
        brand: {
          green: "#10B981",
          "green-dim": "#064E3B",
          purple: "#8B5CF6",
          blue: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #060E1A 0%, #0A1628 40%, #112240 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9993A, #F0B429)",
        "gradient-hero": "linear-gradient(135deg, #0F2545 0%, #1A3355 50%, #0F2545 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "pulse-gold": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
