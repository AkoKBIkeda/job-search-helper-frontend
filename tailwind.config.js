/** @type {import('tailwindcss').Config} */
// https://v3.tailwindcss.com/docs/guides/create-react-app
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C0A0B',
        secondary: '#14171A',
      },
    },
  },
  plugins: [],
}