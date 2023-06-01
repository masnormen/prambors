const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        background: '#fff6ce',
        yellowking: '#fff9a0',
        bloodred: '#ff0000',
        seasalt: '#78e5e7'
      }
    }
  },

  plugins: []
};

module.exports = config;
