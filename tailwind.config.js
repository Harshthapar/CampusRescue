/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F3EDE2',
          300: '#E7DEC8',
        },
        forest: {
          800: '#1B3B2B',
          900: '#11291D',
          950: '#0B1C13',
        },
        mint: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        warmOrange: {
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

