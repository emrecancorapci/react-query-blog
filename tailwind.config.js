/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: ["class"],
  content: [
    "./index.html",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: '#111',
        white: '#e2e2e2',
        purple: {
            light: '#c597fa',
            DEFAULT: '#8C30F5',
            dark: '#44068b',
        }
    },
    spacing: {
        xl: '1200px',
        '2xl': '1440px',
        '3xl': '1920px',
    },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [require("tailwindcss-animate")],
}