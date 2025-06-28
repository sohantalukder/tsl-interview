import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/modules/products/types/product.type';

export interface ProductsState {
  products: IProduct[];
  currentPage: number;
  totalProducts: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentPage: 0,
  totalProducts: 0,
  limit: 20,
  hasMore: true,
  isLoading: false,
  isLoadingMore: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload;
    },

    setProducts: (
      state,
      action: PayloadAction<{
        products: IProduct[];
        total: number;
        skip: number;
        limit: number;
        reset?: boolean;
      }>
    ) => {
      const { products, total, skip, limit, reset = false } = action.payload;

      if (reset) {
        state.products = products;
      } else {
        // For infinite scroll - append new products
        const existingIds = new Set(state.products.map((p) => p.id));
        const newProducts = products.filter((p) => !existingIds.has(p.id));
        state.products = [...state.products, ...newProducts];
      }

      state.totalProducts = total;
      state.limit = limit;
      state.currentPage = Math.floor(skip / limit);
      state.hasMore = skip + limit < total;
      state.isLoading = false;
      state.isLoadingMore = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoadingMore = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },

    resetProducts: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setLoading, setLoadingMore, setProducts, setError, clearErrors, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;

// Essential Selectors
export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.isLoading;
export const selectProductsLoadingMore = (state: { products: ProductsState }) => state.products.isLoadingMore;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectHasMore = (state: { products: ProductsState }) => state.products.hasMore;
export const selectPagination = (state: { products: ProductsState }) => ({
  currentPage: state.products.currentPage,
  totalProducts: state.products.totalProducts,
  limit: state.products.limit,
  hasMore: state.products.hasMore,
});
