/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Enable dark mode via CSS class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Tailwind will scan all files in src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
