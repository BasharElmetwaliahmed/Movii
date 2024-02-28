/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding:'2rem',
    },
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        overpass:["Overpass", 'sans-serif']
      },
      colors: {
        dark: "#0F0F0F",
        secondary: "#db0000",
        secondarydark: "#831010",
        primary: "#FFF",
        primaryhover: "#831010",
        bkg: "#191919",
        graytext: "#564d4d",
      },
    },
  },
  plugins: [],
};
