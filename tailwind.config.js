/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage : {
        'desktop-background' : "url('./assets/images/background-desktop.png')",
        'mobile-background' : "url('./assets/images/background-mobile.png')",
        'tablet-background' : "url('./assets/images/background-tablet.png')",
        "pattern-lines" : "url('./assets/images/pattern-lines.svg')"
      }
    },
  },
  plugins: [],
}

