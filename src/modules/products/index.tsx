import React from 'react';
import { View } from 'react-native';
import Header from './components/header/Header';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import useProducts from './hooks/useProducts';
import ProductsList from '@/shared/components/organisms/product-list/ProductList';

const ProductsScreen = () => {
  const { gutters } = useTheme();
  const { loading, refreshing, productRows, handleRefresh } = useProducts();

  return (
    <View style={[layout.flex_1, gutters.gap_16]}>
      <Header />
      <ProductsList
        products={productRows}
        loading={loading}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />
    </View>
  );
};

export default ProductsScreen;
