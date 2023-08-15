/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      borderColor: {
        primary: '#387838',
      },
      backgroundColor: {
        primary: '#387838',
        body: '#f5f5f5',
        secondary: '#E7E7E7',
        third: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      textColor: {
        primary: '#232340',
        secondary: '#387838',
        third: '#ABABAB',
      },
      boxShadow: {
        primary: ' 0px 2px 4px 0px rgba(56, 120, 56, 0.10)',
      },
    },
  },
  plugins: [],
};
