import type { UseFABReturn } from '@/types/app.types'
import * as Haptics from 'expo-haptics'
import { useCallback, useState } from 'react'

/**
 * Custom hook for managing FAB state and interactions
 *
 * @returns Object containing FAB state and handler functions
 */
export function useFAB(): UseFABReturn {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Toggle the FAB open/closed state
   */
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  /**
   * Close the FAB
   */
  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  /**
   * Open the FAB
   */
  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  /**
   * Handle sub-action button press
   * Provides haptic feedback and closes the FAB
   *
   * @param label - The label of the action being performed
   * @param callback - Optional callback to execute
   */
  const handleAction = useCallback(
    (label: string, callback?: () => void) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      console.log(`${label} pressed`)

      if (callback) {
        callback()
      }

      close()
    },
    [close]
  )

  return {
    isOpen,
    toggle,
    close,
    open,
    handleAction,
  }
}
