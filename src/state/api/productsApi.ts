import { baseApi } from './baseApi';
import { API_CONFIG } from '@/config';
import type { ProductsResponse, GetProductsParams, ApiError } from '@/types/api';
import { IProduct } from '@/modules/products/types/product.type';

// Helper function to build query parameters
const buildQueryParams = (params: Record<string, string | number | boolean>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
};

// Helper function for consistent error transformation
const transformError = (
  response: { data?: { message?: string }; status: number },
  defaultMessage: string
): ApiError => ({
  message: response.data?.message || defaultMessage,
  status: response.status,
  data: response.data,
});

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with pagination and filtering
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: (params = {}) => {
        const {
          limit = API_CONFIG.PAGINATION.DEFAULT_LIMIT,
          skip = API_CONFIG.PAGINATION.DEFAULT_SKIP,
          select,
          sortBy,
          order = 'asc',
        } = params;

        const queryParams = buildQueryParams({
          limit,
          skip,
          ...(select && { select }),
          ...(sortBy && { sortBy }),
          order,
        });

        return {
          url: `${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: (result) => {
        if (!result) return [{ type: 'Product', id: 'LIST' }];

        return [
          ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
          { type: 'Product', id: 'LIST' },
        ];
      },
      serializeQueryArgs: ({ queryArgs }) => {
        // Exclude pagination params for better caching
        const { ...cacheKey } = queryArgs;
        return cacheKey;
      },
      merge: (currentCache, newItems, { arg }) => {
        // Enhanced merge logic for infinite scroll
        if (!currentCache || arg.skip === 0) {
          return newItems;
        }

        // Create a map for O(1) lookup
        const existingProductsMap = new Map(currentCache.products.map((product) => [product.id, product]));

        // Filter out duplicates and merge
        const newUniqueProducts = newItems.products.filter((product) => !existingProductsMap.has(product.id));

        return {
          ...newItems,
          products: [...currentCache.products, ...newUniqueProducts],
          total: newItems.total,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg || !currentArg) return true;

        // Compare all params except skip for infinite scroll
        const { ...currentRest } = currentArg;
        const { ...prevRest } = previousArg;

        return Object.keys({ ...currentRest, ...prevRest }).some(
          (key) => currentRest[key as keyof typeof currentRest] !== prevRest[key as keyof typeof prevRest]
        );
      },
      transformErrorResponse: (response: { data?: { message?: string }; status: number }) =>
        transformError(response, 'Failed to fetch products'),
    }),
    // Get single product by ID
    getProduct: builder.query<IProduct, number | string>({
      query: (id) => ({
        url: `${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
      keepUnusedDataFor: 600,
      transformErrorResponse: (response: { data?: { message?: string }; status: number }) =>
        transformError(response, 'Failed to fetch product'),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useLazyGetProductsQuery, useGetProductQuery, useLazyGetProductQuery } = productsApi;
