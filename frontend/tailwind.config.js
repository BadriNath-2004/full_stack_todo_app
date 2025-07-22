/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Change to your brand color
        'primary-light': '#3b82f6',
        'primary-dark': '#1e40af',
      },
    },
  },
  plugins: [],
};
