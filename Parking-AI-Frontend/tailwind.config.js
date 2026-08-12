/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scan: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(250px)" },
        },
      },
      animation: {
        scan: "scan 2s linear infinite",
      },
    },
  },
  plugins: [],
};