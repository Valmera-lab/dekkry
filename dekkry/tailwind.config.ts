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
          black: '#1a1a1a',
          white: '#f8f7f4',
          cream: '#f8f7f4',
          sand: '#ede9e1',
          gray: {
            50: '#f8f7f4',
            100: '#ede9e1',
            200: '#d8d2c8',
            300: '#b5ada0',
            400: '#8f8680',
            500: '#6b6460',
            600: '#4a4540',
            700: '#2e2b28',
            800: '#1f1d1b',
            900: '#141210',
          },
          accent: '#c8ff00',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
