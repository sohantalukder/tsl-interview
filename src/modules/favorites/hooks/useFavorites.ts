import { useCallback, useMemo } from 'react';
import { IProduct } from '@/modules/products/types/product.type';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  selectFavorites,
  selectFavoritesCount,
  selectFavoritesLoading,
  selectFavoritesError,
  clearAllFavorites,
  toggleFavorite,
  removeFavorite,
} from '@/state/slices/favoritesSlice';

interface UseFavoritesReturn {
  favoritesCount: number;
  favoriteRows: IFavoriteRow[];
  handleClearAll: () => void;
  toggleFavoriteProduct: (product: IProduct) => void;
  removeFavoriteProduct: (productId: number) => void;
  loading: boolean;
  error: string | null;
}

export interface IFavoriteRow {
  id: string;
  leftProduct: IProduct | null;
  rightProduct: IProduct | null;
}

export const useFavorites = (): UseFavoritesReturn => {
  const dispatch = useAppDispatch();

  // Redux state
  const favoriteItems = useAppSelector(selectFavorites);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const loading = useAppSelector(selectFavoritesLoading);
  const error = useAppSelector(selectFavoritesError);

  // Convert FavoriteItem[] to IProduct[] for compatibility
  const favorites = useMemo(() => {
    return favoriteItems.map((item) => item.product);
  }, [favoriteItems]);

  const toggleFavoriteProduct = useCallback(
    (product: IProduct) => {
      dispatch(toggleFavorite(product));
    },
    [dispatch]
  );

  const removeFavoriteProduct = useCallback(
    (productId: number) => {
      dispatch(removeFavorite(productId));
    },
    [dispatch]
  );

  const clearFavorites = useCallback(() => {
    dispatch(clearAllFavorites());
  }, [dispatch]);

  const favoriteRows = useMemo((): IFavoriteRow[] => {
    const rows: IFavoriteRow[] = [];
    for (let i = 0; i < favorites.length; i += 2) {
      rows.push({
        id: `row-${Math.floor(i / 2)}`,
        leftProduct: favorites[i] || null,
        rightProduct: favorites[i + 1] || null,
      });
    }
    return rows;
  }, [favorites]);

  // Handle clear all favorites with confirmation
  const handleClearAll = useCallback(() => {
    Alert.alert('Clear All Favorites', 'Are you sure you want to remove all items from your favorites?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: clearFavorites,
      },
    ]);
  }, [clearFavorites]);

  return {
    favoritesCount,
    favoriteRows,
    handleClearAll,
    toggleFavoriteProduct,
    removeFavoriteProduct,
    loading,
    error,
  };
};
