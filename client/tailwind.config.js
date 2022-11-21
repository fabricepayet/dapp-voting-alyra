/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          main: '#A3FF12'
        },
        black: {
          main: '#090A1A',
          black: 'black'
        },
        blue: {
          dark: '#1E1F35'
        },
        purple: {
          main: '#6D4AFE'
        }
      }
    },
  },
  plugins: [],
}
