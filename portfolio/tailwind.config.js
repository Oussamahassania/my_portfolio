/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marble-red': '#dc2626',
        'marble-dark': '#0a0a0a',
        'marble-black': '#1a1a1a',
      },
      backgroundImage: {
        'marble-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a1a1a 100%)',
        'red-gradient': 'linear-gradient(45deg, #dc2626, #ef4444, #f87171)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
