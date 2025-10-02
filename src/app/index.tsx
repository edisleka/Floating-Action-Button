import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function App() {
  const [open, setOpen] = useState(false)

  const { bottom } = useSafeAreaInsets()

  const radius = 100
  const angles = [90, 135, 180]
  const icons = ['camera-alt', 'edit', 'mic']

  const animations = useRef(
    angles.map(() => ({
      translate: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current

  const getPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: radius * Math.cos(rad), y: -radius * Math.sin(rad) }
  }

  useEffect(() => {
    const sequence = animations.map(({ translate, opacity }) => {
      const toValue = open ? 1 : 0
      return Animated.parallel([
        Animated.timing(translate, {
          toValue,
          duration: open ? 200 : 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue,
          duration: open ? 200 : 150,
          useNativeDriver: true,
        }),
      ])
    })
    Animated.stagger(50, open ? sequence : sequence.reverse()).start()
  }, [open])

  return (
    <View
      className='flex-1 justify-end items-end bg-gray-100'
      style={{ paddingBottom: bottom }}
    >
      <View
        className='absolute w-10 h-10 items-center justify-center bg-red-500'
        style={{ bottom: bottom + 10, right: bottom + 10 }}
      >
        {angles.map((angle, i) => {
          const { x, y } = getPosition(angle)
          const translate = animations[i].translate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          })
          return (
            <Animated.View
              key={i}
              className='absolute w-[50px] h-[50px] rounded-[25px] bg-gray-100 items-center justify-center'
              style={{
                transform: [
                  { translateX: Animated.multiply(translate, x) },
                  { translateY: Animated.multiply(translate, y) },
                ],
                opacity: animations[i].opacity,
              }}
            >
              <Pressable className='w-[50px] h-[50px] rounded-[25px] bg-white border border-gray-200 shadow-md justify-center items-center'>
                <MaterialIcons
                  name={icons[i] as any}
                  size={20}
                  color='dodgerblue'
                />
              </Pressable>
            </Animated.View>
          )
        })}
      </View>
      <Pressable
        className='w-[60px] h-[60px] rounded-[30px] bg-[dodgerblue] justify-center items-center z-[2]'
        style={{ right: bottom }}
        onPress={() => setOpen(!open)}
      >
        <MaterialIcons
          name={open ? 'close' : ('add' as any)}
          size={28}
          color='#fff'
        />
      </Pressable>
    </View>
  )
}
