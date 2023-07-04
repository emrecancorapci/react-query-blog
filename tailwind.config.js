/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
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
        },
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
          },
    },
    plugins: [],
  }
  