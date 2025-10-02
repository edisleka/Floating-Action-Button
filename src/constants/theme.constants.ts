/**
 * Theme constants for consistent styling across light and dark modes
 */

export const THEME = {
  colors: {
    primary: {
      light: '#8b5cf6', // violet-500
      dark: '#7c3aed', // violet-600
      accent: '#a78bfa', // violet-400
    },
    secondary: {
      light: '#ec4899', // pink-500
      dark: '#db2777', // pink-600
    },
    background: {
      light: {
        from: '#faf5ff', // violet-50
        to: '#f5f3ff', // violet-100
      },
      dark: {
        from: '#1e1b4b', // indigo-950
        to: '#312e81', // indigo-900
      },
    },
    card: {
      light: '#ffffff',
      dark: '#312e81', // indigo-900
    },
    border: {
      light: '#e9d5ff', // violet-200
      dark: '#6366f1', // indigo-500
    },
    overlay: {
      light: 'rgba(139, 92, 246, 0.1)', // violet with transparency
      dark: 'rgba(0, 0, 0, 0.4)',
    },
    icon: {
      primary: '#8b5cf6', // violet-500
      secondary: '#ef4444', // red-500
      tertiary: '#06b6d4', // cyan-500
      quaternary: '#f59e0b', // amber-500
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
