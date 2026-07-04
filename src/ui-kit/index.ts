// Base radius: 1rem = 16px
const BASE_RADIUS = 16;

export const lightTheme = {
  colors: {
    background: '#f8fafc', // oklch(0.984 0.005 247)
    foreground: '#0f172a', // oklch(0.21 0.034 264) - slate-900
    card: '#ffffff',
    cardForeground: '#0f172a',
    popover: '#ffffff',
    popoverForeground: '#0f172a',
    primary: '#2563eb', // oklch(0.546 0.215 262)
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    accent: '#e0e7ff',
    accentForeground: '#2563eb',
    destructive: '#dc2626',
    destructiveForeground: '#ffffff',
    success: '#16a34a', // oklch(0.62 0.17 150)
    successForeground: '#ffffff',
    warning: '#eab308',
    warningForeground: '#0f172a',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#2563eb',
    slate: {
      900: '#0f172a',
    }
  },
  radius: {
    sm: BASE_RADIUS - 4,
    md: BASE_RADIUS - 2,
    lg: BASE_RADIUS,
    xl: BASE_RADIUS + 4,
    '2xl': BASE_RADIUS + 8,
    '3xl': BASE_RADIUS + 12,
  },
  fonts: {
    sans: 'Inter',
  },
} as const;

export const themes = {
  general: lightTheme,
} as const;

export const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
} as const;

export type AppBreakpoints = typeof breakpoints
export type AppThemes = typeof themes
export type Theme = typeof lightTheme

export const initialTheme = 'general' as const;
