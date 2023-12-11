/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mm: { max: "390px" },
        mm2: { max: "440px" },
        mm3: { max: "540px" },
        mdMAX: { max: "768px" },
        smMax: { max: "639px" },
        m8: { min: "815px" },
        m8Max: { max: "814px" },
        xl2: { max: "1280px" },
        lg2: { max: "1124px" },
        lg3: { max: "1024px" },
        lg: { min: "1025px" },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      width: {
        "custom-width": "900px",
        100: "28rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
