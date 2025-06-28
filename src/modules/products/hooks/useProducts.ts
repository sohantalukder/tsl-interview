import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IProduct } from '../types/product.type';
import { IResponse } from '@/types/response';
import { NavigationProp } from '@/navigation/type';
import routes from '@/navigation/routes';

interface IProductRow {
  id: string;
  leftProduct: IProduct | null;
  rightProduct: IProduct | null;
}

interface UseProductsReturn {
  loading: boolean;
  refreshing: boolean;
  filteredProducts: IProduct[];
  productRows: IProductRow[];
  fetchProducts: () => Promise<void>;
  handleRefresh: () => void;
  handleProductPress: (product: IProduct) => void;
}

const useProducts = (): UseProductsReturn => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=50');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    loading,
    refreshing,
    filteredProducts,
    productRows,
    fetchProducts,
    handleRefresh,
    handleProductPress,
  };
};

export default useProducts;
