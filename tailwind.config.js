/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#38b6ff',
        'whiteish-letters': '#dafffd',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        fadeInCube: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInOverlay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeInCube: 'fadeInCube 0.5s ease',
        fadeInOverlay: 'fadeInOverlay 0.3s ease',
      },
    },
  },
  plugins: [],
}

