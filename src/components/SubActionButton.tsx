import { CONSTANTS } from '@/constants'
import type { SubActionButtonProps } from '@/types/app.types'
import { getPosition } from '@/utils'
import { MaterialIcons } from '@expo/vector-icons'
import { memo, useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

/**
 * SubActionButton - Individual action button that appears when FAB is expanded
 *
 * Animates into position using spring animations with staggered delays
 * for a smooth cascading effect.
 */
function SubActionButton({
  icon,
  label,
  angle,
  index,
  isOpen,
  onPress,
}: SubActionButtonProps) {
  const progress = useSharedValue(0)
  const rotation = useSharedValue(0)
  const { x, y } = getPosition(angle, CONSTANTS.SUB_ACTION.SPREAD_RADIUS)

  useEffect(() => {
    const delay = isOpen ? index * CONSTANTS.ANIMATION.STAGGER_DELAY : 0

    // Animate position and opacity
    progress.value = withDelay(
      delay,
      withSpring(isOpen ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      })
    )

    // Add subtle rotation animation
    rotation.value = withDelay(
      delay,
      withSpring(isOpen ? 360 : 0, {
        damping: 12,
        stiffness: 100,
      })
    )
  }, [isOpen, index, progress, rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * x },
      { translateY: progress.value * y },
      { scale: progress.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: progress.value,
  }))

  return (
    <Animated.View
      className='absolute w-[50px] h-[50px] items-center justify-center'
      style={animatedStyle}
    >
      <Pressable
        className='w-[50px] h-[50px] rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg justify-center items-center active:scale-90'
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole='button'
        accessibilityHint={`Activate ${label} action`}
      >
        <MaterialIcons
          name={icon as any}
          size={CONSTANTS.SUB_ACTION.ICON_SIZE}
          color='#1e90ff'
        />
      </Pressable>
    </Animated.View>
  )
}

export default memo(SubActionButton)
