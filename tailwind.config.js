/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pop-pink': '#ba006a',
        'pop-orange': '#dd8300',
        'pop-dark': '#1d1e1c',
        'pop-white': '#fefefd',
        'pop-beige': '#ebc07f',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'pop-title': ['DonGraffiti', 'sans-serif']
      },
      borderWidth: {
        'pop': '4px',
      },
      boxShadow: {
        'pop': '8px 8px 0 rgba(29, 30, 28, 1)',
        'pop-sm': '4px 4px 0 rgba(29, 30, 28, 1)',
      }
    },
  },
  plugins: [],
}
