import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Rialo official brand colors
        primary: {
          50: '#f0fcfa',
          100: '#ccf7ef',
          200: '#99efe0',
          300: '#5ee0cd',
          400: '#A9DDD3', // Main Rialo green
          500: '#2dd4bf',
          600: '#14b8a6',
          700: '#0f9488',
          800: '#115e59',
          900: '#134e4a',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfcf7',
          200: '#fbf8f0',
          300: '#f8f3e8',
          400: '#E8E3D5', // Main Rialo cream
          500: '#e6dfc8',
          600: '#d4c5a0',
          700: '#c4b584',
          800: '#a89660',
          900: '#8b7b4f',
        },
        // Keep neutral grays but update pure black
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#010101', // Rialo's pure black
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;