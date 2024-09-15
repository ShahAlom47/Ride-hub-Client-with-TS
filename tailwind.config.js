/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-p': '#1d1f21', 
        'color-s': '#ff0000', 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

