import React from 'react';
import { SafeScreen } from '@/shared/components/templates';
import Header from './components/Header';
import { useTheme } from '@/theme';
const HomeIndex = () => {
  const { gutters } = useTheme();
  return (
    <SafeScreen style={gutters.paddingHorizontal_20}>
      <Header />
    </SafeScreen>
  );
};

export default HomeIndex;
