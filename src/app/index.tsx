import { getPosition } from '@/utils/position'
import { CONSTANTS, FAB_ACTIONS } from '@constants/app.constants'
import { MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Sub-action button component
function SubActionButton({
  icon,
  label,
  angle,
  index,
  isOpen,
  onPress,
}: {
  icon: string
  label: string
  angle: number
  index: number
  isOpen: boolean
  onPress: () => void
}) {
  const progress = useSharedValue(0)
  const { x, y } = getPosition(angle, CONSTANTS.SUB_ACTION.SPREAD_RADIUS)
  useEffect(() => {
    const delay = isOpen ? index * CONSTANTS.ANIMATION.STAGGER_DELAY : 0
    progress.value = withDelay(
      delay,
      withSpring(isOpen ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      })
    )
  }, [isOpen, index, progress])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * x },
      { translateY: progress.value * y },
      { scale: progress.value },
    ],
    opacity: progress.value,
  }))

  return (
    <Animated.View
      className='absolute w-[50px] h-[50px] items-center justify-center'
      style={animatedStyle}
    >
      <Pressable
        className='w-[50px] h-[50px] rounded-full bg-white border border-gray-200 shadow-lg justify-center items-center active:scale-90'
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole='button'
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

// Main FAB component
function MainFAB({
  isOpen,
  onPress,
}: {
  isOpen: boolean
  onPress: () => void
}) {
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
    scale.value = withSpring(0.9, { damping: 10, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 10, stiffness: 300 })
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable
      className='w-[60px] h-[60px] rounded-full bg-blue-500 justify-center items-center shadow-xl active:shadow-md'
      onPress={handlePress}
      accessibilityLabel={isOpen ? 'Close actions menu' : 'Open actions menu'}
      accessibilityRole='button'
      accessibilityState={{ expanded: isOpen }}
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

export default function App() {
  const [open, setOpen] = useState(false)
  const { bottom, right } = useSafeAreaInsets()

  const handleSubActionPress = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    console.log(`${label} pressed`)
    setOpen(false)
  }

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  // Calculate safe positioning
  const fabBottom = Math.max(bottom, CONSTANTS.SPACING.EDGE_OFFSET)
  const fabRight = Math.max(right, CONSTANTS.SPACING.EDGE_OFFSET)

  return (
    <View className='flex-1 bg-gradient-to-b from-blue-50 to-gray-100'>
      {/* Overlay to close FAB when tapping outside */}
      {open && (
        <Pressable
          className='absolute inset-0 bg-black/10'
          onPress={toggleOpen}
          accessibilityLabel='Close actions menu'
        />
      )}

      {/* FAB Container */}
      <View
        className='absolute'
        style={{
          bottom: fabBottom,
          right: fabRight,
        }}
      >
        {/* Sub-action buttons */}
        <View className='absolute inset-0 items-center justify-center'>
          {FAB_ACTIONS.map((action, index) => (
            <SubActionButton
              key={action.icon}
              icon={action.icon}
              label={action.label}
              angle={CONSTANTS.SUB_ACTION.ANGLES[index]}
              index={index}
              isOpen={open}
              onPress={() => handleSubActionPress(action.label)}
            />
          ))}
        </View>

        {/* Main FAB */}
        <MainFAB isOpen={open} onPress={toggleOpen} />
      </View>
    </View>
  )
}
