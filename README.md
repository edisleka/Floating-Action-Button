# Floating Action Button (FAB) - Expo App 🎯

A beautifully animated floating action button implementation for React Native using Expo, featuring smooth spring animations, haptic feedback, and full accessibility support.

## ✨ Features

- **🎨 Beautiful Animations**: Smooth spring-based animations with staggered delays
- **📱 Haptic Feedback**: Tactile response on button presses for better UX
- **♿ Fully Accessible**: Comprehensive accessibility labels and hints for screen readers
- **🌓 Dark Mode Support**: Automatic theme switching with system preferences
- **📐 Safe Area Handling**: Works perfectly on all devices with notches and safe areas
- **⚡ Performance Optimized**: Memoized components and native driver animations
- **🎯 Type-Safe**: Full TypeScript support with comprehensive types
- **🏗️ Well Organized**: Clean architecture with separated concerns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Expo CLI (will be installed with dependencies)
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Run on your platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Application screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Main screen with FAB
├── components/            # Reusable components
│   ├── MainFAB.tsx       # Main floating action button
│   ├── SubActionButton.tsx # Sub-action buttons
│   └── index.ts          # Component exports
├── constants/             # App constants
│   ├── app.constants.tsx  # FAB configuration
│   └── theme.constants.ts # Theme colors
├── hooks/                 # Custom React hooks
│   ├── useFAB.ts         # FAB state management
│   └── index.ts          # Hook exports
├── types/                 # TypeScript type definitions
│   └── app.types.ts      # Application types
├── utils/                 # Utility functions
│   ├── position.ts       # Position calculations
│   ├── cn.ts            # Class name utilities
│   └── index.ts         # Utility exports
└── global.css            # Global styles
```

## 🎯 Architecture Highlights

### Component Structure

- **MainFAB**: The primary floating action button with rotation animation
- **SubActionButton**: Individual action buttons that expand from the main FAB
- All components are memoized for optimal performance

### State Management

- Custom `useFAB` hook manages all FAB state and interactions
- Centralized state logic for easy testing and maintenance

### Animation System

- Uses `react-native-reanimated` for 60fps animations
- Spring physics for natural-feeling motion
- Staggered animations for visual polish

### Styling

- NativeWind (Tailwind CSS for React Native)
- No inline styles - all styling through utility classes
- Full dark mode support with automatic switching

### Constants

All configurable values are centralized:

- Button sizes and spacing
- Animation timings
- Action configurations
- Theme colors

## 🎨 Customization

### Add New Actions

Edit `src/constants/app.constants.tsx`:

```typescript
export const FAB_ACTIONS = [
  { icon: 'camera-alt', label: 'Take Photo', color: 'dodgerblue' },
  { icon: 'edit', label: 'Edit', color: 'dodgerblue' },
  { icon: 'mic', label: 'Record Audio', color: 'dodgerblue' },
  { icon: 'share', label: 'Share', color: 'dodgerblue' }, // Add new action
]

// Update angles array to match number of actions
export const CONSTANTS = {
  SUB_ACTION: {
    ANGLES: [90, 120, 150, 180], // 4 actions now
    // ...
  },
  // ...
}
```

### Adjust Animation Timing

Modify `src/constants/app.constants.tsx`:

```typescript
export const CONSTANTS = {
  ANIMATION: {
    OPEN_DURATION: 200, // Opening animation duration
    CLOSE_DURATION: 150, // Closing animation duration
    STAGGER_DELAY: 50, // Delay between each sub-action
  },
}
```

### Change Colors

Edit `src/constants/theme.constants.ts` for comprehensive theme control.

## 🧪 Technologies Used

- **Expo SDK 54**: Cross-platform app framework
- **React Native 0.81**: Mobile UI framework
- **TypeScript**: Type safety and better DX
- **NativeWind**: Tailwind CSS for React Native
- **React Native Reanimated**: High-performance animations
- **Expo Haptics**: Tactile feedback
- **Expo Router**: File-based routing

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (with limited haptic support)

## ♿ Accessibility

This app is built with accessibility in mind:

- All interactive elements have `accessibilityLabel` and `accessibilityRole`
- Proper `accessibilityHint` for context
- Dynamic `accessibilityState` for current state
- Screen reader compatible

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT

## 🙏 Acknowledgments

Built with ❤️ using Expo and React Native
