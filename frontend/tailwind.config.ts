/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    fontFamily: {
      cormorant: ['var(--font-cormorant)', 'serif'],
      'source-sans': ['var(--font-source-sans)', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-blue': '#0B1F3A',
        'accent-gold': '#C8A75A',
      },
      maxHeight: {
        75: '18.75rem', // 300px
      },
    },
  },
  plugins: [],
};
