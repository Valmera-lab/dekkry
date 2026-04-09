import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black:  '#0d0d0d',
          white:  '#f0ede8',
          lime:   '#c8f135',
          gray: {
            50:  '#f0ede8',
            100: '#e0ddd8',
            200: '#c4c1bc',
            300: '#a09d98',
            400: '#7c7975',
            500: '#5a5754',
            600: '#3e3b38',
            700: '#2a2826',
            800: '#1c1a18',
            900: '#121110',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
