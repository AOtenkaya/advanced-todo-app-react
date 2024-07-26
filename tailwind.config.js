/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGray: '#161719',
        mediumGray: '#282e3a',
      },
    },
  },
  plugins: [],
};
