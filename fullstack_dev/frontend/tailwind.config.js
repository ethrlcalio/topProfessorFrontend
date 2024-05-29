
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'penn-blue': '#00215E',
        'mustard': '#FFD460',
        'anti-flash': '#F0F0F0',
        'jet': '#292929',
        'gray': '#767981',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'ui-sans-serif', 'system-ui'],
        'grotesk': ['Space Grotesk', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
}