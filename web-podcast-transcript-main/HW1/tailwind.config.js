/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This enables the class-based dark mode
  content: [
    './*.html', // Includes all HTML files in the root directory
    './src/**/*.{html,js}', // Includes all HTML and JS files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'], // Adding Merriweather as the serif font
      },
    },
  },
  plugins: [],
}

