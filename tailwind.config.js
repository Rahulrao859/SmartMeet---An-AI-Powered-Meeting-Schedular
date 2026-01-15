/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#0a0e27',
          800: '#0f1535',
          700: '#141b47',
          600: '#1a2355',
        },
        'primary-purple': '#6366f1',
        'primary-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
}
