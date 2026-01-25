/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Gold/bronze accent colors for buttons and highlights
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        // Golden brown to match logo
        'golden-brown': '#AD8330'
      },
      fontFamily: {
        // Serif for headings, sans-serif for body
        'serif': ['Georgia', 'serif'],
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      // Smooth scroll is handled in CSS, but we can add scroll utilities
      scrollBehavior: {
        'smooth': 'smooth'
      }
    }
  },
  plugins: []
}
