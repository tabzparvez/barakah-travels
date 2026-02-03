/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b1822a', // Barakah gold
          dark: '#8a6a1f',
          light: '#f5e7c0',
        },
        secondary: {
          DEFAULT: '#171717', // Deep gray
          light: '#ededed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'Arial'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(34,34,34,0.08)',
      },
    },
  },
  plugins: [],
};
