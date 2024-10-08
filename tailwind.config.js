/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-p': '#100f0f',
        'color-s': '#ff0000',
      },
      fontFamily: {
        pFont: ['Oswald', 'sans-serif'],
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
