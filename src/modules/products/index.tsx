import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { IProduct } from './types/product.type';
import { IResponse } from '@/types/response';
import { ProductCard } from './components/product-card/ProductCard';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';
import rs from '@/shared/utilities/responsiveSize';
import Header from './components/header/Header';
import { EmptyContent } from '@/shared/components/molecules';

// Define a proper interface for product rows
interface IProductRow {
  id: string;
  leftProduct: IProduct | null;
  rightProduct: IProduct | null;
}

export const ProductsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=50');
      const data: IResponse<IProduct> = await response.json();
      setFilteredProducts(data.products);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products. Please try again.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  const handleProductPress = useCallback(
    (product: IProduct) => {
      navigation.navigate(routes.productDetail, {
        id: product.id.toString(),
        title: product.title,
      });
    },
    [navigation]
  );

  const handleToggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  // Convert products into structured rows - more efficient than inline mapping
  const productRows = useMemo(() => {
    const rows: IProductRow[] = [];
    for (let i = 0; i < filteredProducts.length; i += 2) {
      rows.push({
        id: `row-${Math.floor(i / 2)}`,
        leftProduct: filteredProducts[i] || null,
        rightProduct: filteredProducts[i + 1] || null,
      });
    }
    return rows;
  }, [filteredProducts]);

  // Optimized render function without map - pre-structured data
  const renderProductRow = useCallback(
    ({ item }: { item: IProductRow }) => (
      <View style={styles.productRow}>
        <View style={styles.productContainer}>
          {item.leftProduct ? (
            <ProductCard
              product={item.leftProduct}
              onPress={handleProductPress}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(item.leftProduct.id)}
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
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(item.rightProduct.id)}
            />
          ) : (
            <View style={styles.emptyCard} />
          )}
        </View>
      </View>
    ),
    [favorites, handleProductPress, handleToggleFavorite]
  );

  const keyExtractor = useCallback((item: IProductRow) => item.id, []);
  const separator = useMemo(() => ({ height: rs(16) }), []);
  return (
    <FlashList
      data={productRows}
      renderItem={renderProductRow}
      keyExtractor={keyExtractor}
      estimatedItemSize={320}
      ListHeaderComponent={<Header />}
      ListEmptyComponent={<EmptyContent isLoading={loading} />}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      // eslint-disable-next-line react/no-unstable-nested-components
      ItemSeparatorComponent={() => <View style={separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: rs(16),
  },
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
