import { CONSTANTS } from '@/constants'
import type { MainFABProps } from '@/types/app.types'
import { MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { memo, useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

/**
 * MainFAB - Main floating action button
 *
 * Features:
 * - Rotates 45° when opened (+ becomes ×)
 * - Scale animation on press for tactile feedback
 * - Haptic feedback on interaction
 * - Accessible with proper ARIA labels
 */
function MainFAB({ isOpen, onPress }: MainFABProps) {
  const rotation = useSharedValue(0)
  const scale = useSharedValue(1)

  useEffect(() => {
    rotation.value = withTiming(isOpen ? 45 : 0, {
      duration: CONSTANTS.ANIMATION.OPEN_DURATION,
    })
  }, [isOpen, rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }))

  const handlePress = () => {
    // Bounce animation
    scale.value = withSpring(0.9, { damping: 10, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 300 })
    })

    // Haptic feedback for better UX
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable
      className='w-[60px] h-[60px] rounded-full bg-violet-500 dark:bg-violet-600 justify-center items-center shadow-xl active:shadow-md'
      onPress={handlePress}
      accessibilityLabel={isOpen ? 'Close actions menu' : 'Open actions menu'}
      accessibilityRole='button'
      accessibilityState={{ expanded: isOpen }}
      accessibilityHint='Press to toggle quick actions'
    >
      <Animated.View style={animatedStyle}>
        <MaterialIcons
          name={isOpen ? 'close' : 'add'}
          size={CONSTANTS.FAB.ICON_SIZE}
          color='#fff'
        />
      </Animated.View>
    </Pressable>
  )
}

export default memo(MainFAB)
