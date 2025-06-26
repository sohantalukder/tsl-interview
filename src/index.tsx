import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import layout from '@/theme/layout'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from '@/theme';
import { View, Text } from 'react-native';

const MainIndex = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.flex_1}>  
          <ThemeProvider>
            <View style={layout.flex_1}>
              <Text>MainIndex</Text>
            </View>
          </ThemeProvider>
      </GestureHandlerRootView> 
    </SafeAreaProvider>
  )
}

export default MainIndex