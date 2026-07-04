/** @type {import('tailwindcss').Config} */
const BASE_RADIUS = 16;

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#0f172a',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#e0e7ff',
          foreground: '#2563eb',
        },
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#eab308',
          foreground: '#0f172a',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#2563eb',
        slate: {
          900: '#0f172a',
        },
      },
      borderRadius: {
        sm: BASE_RADIUS - 4,
        md: BASE_RADIUS - 2,
        lg: BASE_RADIUS,
        xl: BASE_RADIUS + 4,
        '2xl': BASE_RADIUS + 8,
        '3xl': BASE_RADIUS + 12,
      },
      fontFamily: {
        sans: ['Inter'],
      },
      screens: {
        xs: '0px',
        sm: '300px',
        md: '500px',
        lg: '800px',
        xl: '1200px',
      },
    },
  },
  plugins: [],
};
