/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        jose: ['Josefin Sans'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

