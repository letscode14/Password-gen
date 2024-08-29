/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    screens: {
      xs: { max: "600px" },
      sm: "601px",
      md: "800px",
      lg: "1200px",
      xl: "1400px",
      "2xl": "1600px",
    },
  },
  plugins: [],
};
