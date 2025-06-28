import React from 'react';
import { View } from 'react-native';
import { FavoritesHeader } from './components/FavoritesHeader';
import { useFavorites } from './hooks/useFavorites';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/shared/components/templates';
import ProductsList from '@/shared/components/organisms/product-list/ProductList';

const FavoritesScreen = () => {
  const { gutters } = useTheme();
  const { favoritesCount, favoriteRows, handleClearAll } = useFavorites();

  return (
    <SafeScreen>
      <FavoritesHeader
        favoritesCount={favoritesCount}
        onClearAll={handleClearAll}
      />
      <View style={[layout.flex_1, gutters.paddingHorizontal_8]}>
        <ProductsList
          products={favoriteRows}
          loading={false}
          refreshing={false}
          handleRefresh={() => {}}
        />
      </View>
    </SafeScreen>
  );
};

export default FavoritesScreen;
