import { View, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import rs from '@/shared/utilities/responsiveSize';
import { FlashList } from '@shopify/flash-list';
import { EmptyContent } from '@/shared/components/molecules';
import { IProduct, IProductRow } from '@/modules/products/types/product.type';
import { ProductCard } from '@/modules/products/components/product-card/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';
interface ProductsListProps {
  products: IProductRow[];
  loading: boolean;
  refreshing: boolean;
  handleRefresh: () => void;
}

const Separator = () => <View style={{ height: rs(16) }} />;

const ProductsList = ({ products, loading, refreshing, handleRefresh }: ProductsListProps) => {
  const navigation = useNavigation<NavigationProp>();
  const handleProductPress = useCallback(
    (product: IProduct) => {
      navigation.navigate(routes.productDetail, { id: product.id.toString() });
    },
    [navigation]
  );
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
    <FlashList
      data={products}
      renderItem={renderProductRow}
      keyExtractor={keyExtractor}
      estimatedItemSize={320}
      ListEmptyComponent={
        <View style={{ height: rs('wf') }}>
          <EmptyContent
            isLoading={loading}
            title="No products found!"
            description="Please try again later."
          />
        </View>
      }
      onRefresh={handleRefresh}
      refreshing={refreshing}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductsList;

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
