/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F0F7F4",
        secondary: "#3C493F",
        highlight: "#B3BFB8",
        accent: "#A2E3C4",
      },
    },
  },
  plugins: [],
};
