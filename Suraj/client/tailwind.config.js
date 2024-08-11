/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteText: '#FFFFFF',
        darkText: '#333333',
        lightText: '#AAAAAA',
        greenText: '#34C759',
        redText: '#FF3737',
        skyText: '#87CEEB',
      },
      flex:{
        full:"0 0 100%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("@tailwindcss/aspect-ratio"),
  ],
}

