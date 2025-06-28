import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteItem } from '@/types/api';
import { IProduct } from '@/modules/products/types/product.type';

export interface FavoritesState {
  favorites: FavoriteItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    toggleFavorite: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const existingIndex = state.favorites.findIndex((fav) => fav.product.id === product.id);

      if (existingIndex === -1) {
        // Add to favorites
        const newFavorite: FavoriteItem = {
          id: product.id,
          product,
          addedAt: new Date().toISOString(),
        };
        state.favorites.unshift(newFavorite);
      } else {
        // Remove from favorites
        state.favorites.splice(existingIndex, 1);
      }
      state.error = null;
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.product.id !== productId);
      state.error = null;
    },

    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.favorites = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    clearAllFavorites: (state) => {
      state.favorites = [];
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, toggleFavorite, removeFavorite, setFavorites, clearAllFavorites, setError, clearError } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

// Essential Selectors
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.favorites;
export const selectFavoritesCount = (state: { favorites: FavoritesState }) => state.favorites.favorites.length;
export const selectFavoritesLoading = (state: { favorites: FavoritesState }) => state.favorites.isLoading;
export const selectFavoritesError = (state: { favorites: FavoritesState }) => state.favorites.error;
export const selectIsFavorite = (state: { favorites: FavoritesState }, productId: number) =>
  state.favorites.favorites.some((fav) => fav.product.id === productId);
export const selectFavoriteProducts = (state: { favorites: FavoritesState }) =>
  state.favorites.favorites.map((fav) => fav.product);
