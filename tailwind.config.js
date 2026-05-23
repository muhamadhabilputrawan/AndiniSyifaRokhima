/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        dark:  '#0D0B09',
        dark2: '#141210',
        dark3: '#1A1714',
        cream: '#F5F0E8',
        gold:  '#C9A87C',
        'gold-light': '#E2C99A',
      },
      fontSize: {
        '10xl': ['10rem',  { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        '9xl':  ['8rem',   { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        '8xl':  ['6rem',   { lineHeight: '0.9',  letterSpacing: '-0.02em' }],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
