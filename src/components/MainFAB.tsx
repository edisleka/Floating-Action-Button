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
  const iconScale = useSharedValue(1)

  useEffect(() => {
    rotation.value = withTiming(isOpen ? 45 : 0, {
      duration: CONSTANTS.ANIMATION.OPEN_DURATION,
    })

    // Pulse the icon when opening
    if (isOpen) {
      iconScale.value = withSpring(1.2, { damping: 8, stiffness: 200 }, () => {
        iconScale.value = withSpring(1, { damping: 8, stiffness: 200 })
      })
    }
  }, [isOpen, rotation, iconScale])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }))

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
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
      className='w-[70px] h-[70px] rounded-full bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 justify-center items-center shadow-2xl border-4 border-white/90 dark:border-violet-300/20'
      style={{
        elevation: 12,
        shadowColor: '#8b5cf6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
      onPress={handlePress}
      accessibilityLabel={isOpen ? 'Close actions menu' : 'Open actions menu'}
      accessibilityRole='button'
      accessibilityState={{ expanded: isOpen }}
      accessibilityHint='Press to toggle quick actions'
    >
      <Animated.View style={animatedStyle}>
        <Animated.View style={iconAnimatedStyle}>
          <MaterialIcons
            name={isOpen ? 'close' : 'add'}
            size={CONSTANTS.FAB.ICON_SIZE}
            color='#fff'
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

export default memo(MainFAB)
