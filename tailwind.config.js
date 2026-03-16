/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          light: '#7DD3FC',
          dark: '#0369A1',
        },
        accent: {
          DEFAULT: '#FBBF24',
          light: '#FDE68A',
          dark: '#B45309',
        },
        success: '#10B981',
        danger: '#F43F5E',
        michi: {
          purple: '#9333EA',
          pink: '#DB2777',
          blue: '#2563EB',
          teal: '#0D9488',
          yellow: '#F59E0B',
          navy: '#1E1B4B',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'michi': '0 10px 40px -10px rgba(124, 58, 237, 0.3)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}


