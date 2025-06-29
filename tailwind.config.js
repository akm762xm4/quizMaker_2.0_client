/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#f4f4f4",
        muted: "#f0f0f0",
        accent: "#7c3aed",
        highlight: "#e5e5ff",
        "text-primary": "#111111",
        "text-secondary": "#555555",
        danger: "#ef4444",
        success: "#22c55e",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
        modal: "0 10px 25px rgba(124, 58, 237, 0.25)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
      },
      screens: {
        xs: "360px", // Optional: Support very small phones
      },
    },
  },
  plugins: [],
};
