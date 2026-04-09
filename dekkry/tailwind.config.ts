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
          black: '#111110',
          white: '#f5f3ef',
          cream: '#f5f3ef',
          sand: '#eceae4',
          gray: {
            50:  '#f5f3ef',
            100: '#eceae4',
            200: '#d6d3ca',
            300: '#b0ada4',
            400: '#86837b',
            500: '#5c5a54',
            600: '#3e3d38',
            700: '#2a2926',
            800: '#1c1c1a',
            900: '#141412',
          },
          accent: '#d4ff1e',
        },
      },
      letterSpacing: {
        'ultra': '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
