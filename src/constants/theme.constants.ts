/**
 * Theme constants for consistent styling across light and dark modes
 */

export const THEME = {
  colors: {
    primary: {
      light: '#3b82f6', // blue-500
      dark: '#2563eb', // blue-600
    },
    background: {
      light: {
        from: '#eff6ff', // blue-50
        to: '#f3f4f6', // gray-100
      },
      dark: {
        from: '#111827', // gray-900
        to: '#1f2937', // gray-800
      },
    },
    card: {
      light: '#ffffff',
      dark: '#1f2937', // gray-800
    },
    border: {
      light: '#e5e7eb', // gray-200
      dark: '#374151', // gray-700
    },
    overlay: {
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(0, 0, 0, 0.3)',
    },
    icon: {
      primary: '#1e90ff', // dodgerblue
      white: '#ffffff',
    },
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
} as const

export type ThemeColors = typeof THEME.colors
export type ColorScheme = 'light' | 'dark'
