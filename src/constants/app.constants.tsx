import type { FABAction } from '@/types/app.types'

// App-wide constants for consistent sizing and styling
export const CONSTANTS = {
  // Floating Action Button
  FAB: {
    SIZE: 70, // Increased from 60 for better visibility
    ICON_SIZE: 32, // Increased from 28 for better visibility
    RADIUS: 35,
  },
  // Sub-action buttons
  SUB_ACTION: {
    SIZE: 50,
    ICON_SIZE: 22, // Increased from 20 for better visibility
    RADIUS: 25,
    SPREAD_RADIUS: 110, // Increased from 100 for more space
    ANGLES: [90, 135, 180], // 3 actions with even spacing
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
  { icon: 'photo-camera', label: 'Take Photo', color: '#8b5cf6' }, // violet-500
  { icon: 'favorite', label: 'Add to Favorites', color: '#ef4444' }, // red-500
  { icon: 'share', label: 'Share', color: '#06b6d4' }, // cyan-500
]
