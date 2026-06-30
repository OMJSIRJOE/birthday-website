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
        luxury: {
          black: "#090909",
          gold: "#D4AF37",
          "gold-light": "#E8C547",
          "gold-dark": "#B8962E",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #B8962E 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)",
        "gold-lg":
          "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)",
        luxury: "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        pulseGold: "pulseGold 2s ease-in-out infinite",
        spinSlow: "spin 8s linear infinite",
        fall: "fall 10s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(110vh) rotate(360deg)",
            opacity: "0.3",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
