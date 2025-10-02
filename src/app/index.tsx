import { MainFAB, SubActionButton } from '@/components'
import { CONSTANTS, FAB_ACTIONS } from '@/constants'
import { useFAB } from '@/hooks'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * Main App Component
 *
 * Features a floating action button (FAB) with expandable sub-actions.
 * Includes:
 * - Spring-based animations for smooth transitions
 * - Haptic feedback for better UX
 * - Full accessibility support
 * - Dark mode support
 * - Safe area handling for all devices
 */
export default function App() {
  const { isOpen, toggle, handleAction } = useFAB()
  const { bottom, right } = useSafeAreaInsets()

  // Calculate safe positioning with minimum offset
  const fabBottom = Math.max(bottom, CONSTANTS.SPACING.EDGE_OFFSET)
  const fabRight = Math.max(right, CONSTANTS.SPACING.EDGE_OFFSET)

  return (
    <View className='flex-1 bg-gradient-to-b from-violet-50 to-violet-100 dark:from-indigo-950 dark:to-indigo-900'>
      {/* Backdrop overlay - closes FAB when tapped */}
      {isOpen && (
        <Pressable
          className='absolute inset-0 bg-violet-500/10 dark:bg-black/40'
          onPress={toggle}
          accessibilityLabel='Close actions menu'
          accessibilityRole='button'
        />
      )}

      {/* FAB Container - positioned in bottom-right corner */}
      <View
        className='absolute'
        style={{
          bottom: fabBottom,
          right: fabRight,
        }}
      >
        {/* Sub-action buttons container */}
        <View className='absolute inset-0 items-center justify-center'>
          {FAB_ACTIONS.map((action, index) => (
            <SubActionButton
              key={action.icon}
              icon={action.icon}
              label={action.label}
              color={action.color}
              angle={CONSTANTS.SUB_ACTION.ANGLES[index]}
              index={index}
              isOpen={isOpen}
              onPress={() => handleAction(action.label)}
            />
          ))}
        </View>

        {/* Main FAB button */}
        <MainFAB isOpen={isOpen} onPress={toggle} />
      </View>
    </View>
  )
}
