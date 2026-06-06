/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'soft-md': '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'soft-lg': '0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
        'soft-xl': '0 20px 60px rgba(0,0,0,0.13)',
        blue: '0 4px 14px rgba(59,130,246,0.35)',
        'blue-sm': '0 2px 8px rgba(59,130,246,0.25)',
        'dark-soft': '0 4px 16px rgba(0,0,0,0.3)',
        'dark-md': '0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3b82f6, #6366f1)',
        'dark-gradient': 'linear-gradient(135deg, #1e293b, #0f172a)',
      },
    },
  },
  plugins: [],
};
