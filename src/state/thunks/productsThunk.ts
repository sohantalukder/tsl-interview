import { createAsyncThunk } from '@reduxjs/toolkit';
import type { GetProductsParams } from '@/types/api';
import { productsApi } from '../api/productsApi';
import { setProducts, setLoading, setLoadingMore, setError } from '../slices/productsSlice';
import type { RootState } from '../store';

// Helper function to extract error message
const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object') {
    const errorObj = error as { data?: { message?: string }; message?: string };
    if (errorObj.data?.message) return errorObj.data.message;
    if (errorObj.message) return errorObj.message;
  }
  return defaultMessage;
};

// Load initial products
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (params: GetProductsParams = {}, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const result = await dispatch(productsApi.endpoints.getProducts.initiate({ ...params, skip: 0 }));

      if (result.data) {
        dispatch(
          setProducts({
            products: result.data.products,
            total: result.data.total,
            skip: result.data.skip,
            limit: result.data.limit,
            reset: true,
          })
        );
        return result.data;
      } else {
        const errorMessage = getErrorMessage(result.error, 'Failed to load products');
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to load products');
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Load more products for infinite scroll
export const loadMoreProducts = createAsyncThunk(
  'products/loadMoreProducts',
  async (params: GetProductsParams = {}, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { currentPage, limit, hasMore, isLoadingMore } = state.products;

      if (!hasMore || isLoadingMore) {
        return null;
      }

      dispatch(setLoadingMore(true));

      const nextSkip = (currentPage + 1) * limit;

      const result = await dispatch(
        productsApi.endpoints.getProducts.initiate({
          ...params,
          skip: nextSkip,
          limit,
        })
      );

      if (result.data) {
        dispatch(
          setProducts({
            products: result.data.products,
            total: result.data.total,
            skip: result.data.skip,
            limit: result.data.limit,
            reset: false,
          })
        );
        return result.data;
      } else {
        const errorMessage = getErrorMessage(result.error, 'Failed to load more products');
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Failed to load more products');
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
