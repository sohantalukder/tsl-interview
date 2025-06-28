import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { loadProducts, loadMoreProducts } from '@/state/thunks/productsThunk';
import {
  selectProducts,
  selectProductsLoading,
  selectHasMore,
  selectProductsLoadingMore,
} from '@/state/slices/productsSlice';
import { IProduct } from '../types/product.type';

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
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoadingMore: boolean;
}

const useProducts = (): UseProductsReturn => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  // Redux state
  const reduxProducts = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const hasMore = useAppSelector(selectHasMore);
  const isLoadingMore = useAppSelector(selectProductsLoadingMore);

  // Convert Redux products to your existing format
  const filteredProducts = useMemo(() => {
    return reduxProducts.map((product) => ({
      ...product,
      // Ensure compatibility with your existing IProduct interface
    })) as IProduct[];
  }, [reduxProducts]);

  const fetchProducts = useCallback(async () => {
    try {
      await dispatch(loadProducts({ limit: 50 })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products. Please try again.');
      console.error('Error fetching products:', error);
    }
  }, [dispatch]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;

    try {
      await dispatch(loadMoreProducts({ limit: 20 })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to load more products. Please try again.');
      console.error('Error loading more products:', error);
    }
  }, [dispatch, hasMore, isLoadingMore]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts().finally(() => setRefreshing(false));
  }, [fetchProducts]);

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
    if (filteredProducts.length === 0 && !loading) {
      fetchProducts();
    }
  }, [fetchProducts, filteredProducts.length, loading]);

  return {
    loading,
    refreshing,
    filteredProducts,
    productRows,
    fetchProducts,
    handleRefresh,
    loadMore,
    hasMore,
    isLoadingMore,
  };
};

export default useProducts;
