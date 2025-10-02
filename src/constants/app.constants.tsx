import type { FABAction } from '@/types/app.types'

// App-wide constants for consistent sizing and styling
export const CONSTANTS = {
  // Floating Action Button
  FAB: {
    SIZE: 60,
    ICON_SIZE: 28,
    RADIUS: 30,
  },
  // Sub-action buttons
  SUB_ACTION: {
    SIZE: 50,
    ICON_SIZE: 20,
    RADIUS: 25,
    SPREAD_RADIUS: 100, // Distance from main FAB
    ANGLES: [90, 135, 180], // Angles in degrees
  },
  // Animation timing
  ANIMATION: {
    OPEN_DURATION: 200,
    CLOSE_DURATION: 150,
    STAGGER_DELAY: 50,
  },
  // Spacing
  SPACING: {
    EDGE_OFFSET: 20, // Distance from screen edges
  },
} as const

// Action button configurations
export const FAB_ACTIONS: FABAction[] = [
  { icon: 'camera-alt', label: 'Take Photo', color: '#8b5cf6' }, // violet-500
  { icon: 'edit', label: 'Edit', color: '#ec4899' }, // pink-500
  { icon: 'mic', label: 'Record Audio', color: '#f59e0b' }, // amber-500
]
