// Core types for the floating action button app

/**
 * Represents a single action button configuration
 */
export interface FABAction {
  icon: string
  label: string
  color: string
}

/**
 * Position coordinates in 2D space
 */
export interface Position {
  x: number
  y: number
}

/**
 * Props for the SubActionButton component
 */
export interface SubActionButtonProps {
  icon: string
  label: string
  color: string
  angle: number
  index: number
  isOpen: boolean
  onPress: () => void
}

/**
 * Props for the MainFAB component
 */
export interface MainFABProps {
  isOpen: boolean
  onPress: () => void
}

/**
 * Animation configuration for spring animations
 */
export interface SpringConfig {
  damping: number
  stiffness: number
}

/**
 * Animation configuration for timing animations
 */
export interface TimingConfig {
  duration: number
}

/**
 * Return type for the useFAB hook
 */
export interface UseFABReturn {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
  handleAction: (label: string, callback?: () => void) => void
}
