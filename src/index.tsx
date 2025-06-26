import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import layout from '@/theme/layout'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from '@/theme';
import Navigation from '@/navigation';

const MainIndex = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.flex_1}>  
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
      </GestureHandlerRootView> 
    </SafeAreaProvider>
  )
}

export default MainIndex