import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import layout from '@/theme/layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import Navigation from '@/navigation';
import { Provider } from 'react-redux';
import { store } from '@/state';

const MainIndex = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={layout.flex_1}>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default MainIndex;
