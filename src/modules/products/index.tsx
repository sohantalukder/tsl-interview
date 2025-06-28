import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ProductCard } from './components/product-card/ProductCard';
import rs from '@/shared/utilities/responsiveSize';
import Header from './components/header/Header';
import { EmptyContent } from '@/shared/components/molecules';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';
import useProducts from './hooks/useProducts';

interface IProductRow {
  id: string;
  leftProduct: any | null;
  rightProduct: any | null;
}

const Separator = () => <View style={{ height: rs(16) }} />;

export const ProductsScreen = () => {
  const { gutters } = useTheme();
  const { loading, refreshing, productRows, handleRefresh, handleProductPress } = useProducts();

  // Optimized render function without map - pre-structured data
  const renderProductRow = useCallback(
    ({ item }: { item: IProductRow }) => (
      <View style={styles.productRow}>
        <View style={styles.productContainer}>
          {item.leftProduct ? (
            <ProductCard
              product={item.leftProduct}
              onPress={handleProductPress}
            />
          ) : (
            <View style={styles.emptyCard} />
          )}
        </View>
        <View style={styles.productContainer}>
          {item.rightProduct ? (
            <ProductCard
              product={item.rightProduct}
              onPress={handleProductPress}
            />
          ) : (
            <View style={styles.emptyCard} />
          )}
        </View>
      </View>
    ),
    [handleProductPress]
  );

  const keyExtractor = useCallback((item: IProductRow) => item.id, []);

  return (
    <View style={[layout.flex_1, gutters.gap_16]}>
      <Header />
      <FlashList
        data={productRows}
        renderItem={renderProductRow}
        keyExtractor={keyExtractor}
        estimatedItemSize={320}
        ListEmptyComponent={
          <EmptyContent
            isLoading={loading}
            title="No products found!"
            description="Please try again later."
          />
        }
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productRow: {
    flexDirection: 'row',
  },
  productContainer: {
    flex: 1,
    padding: rs(8),
  },
  emptyCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: rs(16),
  },
});
