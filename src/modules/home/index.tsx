import React from 'react';
import { SafeScreen } from '@/shared/components/templates';
import { useTheme } from '@/theme';
import { ProductsScreen } from '../products';
const HomeIndex = () => {
  const { gutters } = useTheme();
  return (
    <SafeScreen style={gutters.paddingHorizontal_20}>
      <ProductsScreen />
    </SafeScreen>
  );
};

export default HomeIndex;
