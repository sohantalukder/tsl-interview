import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/config';
import type { RootState } from '@/state/store'; // Import your root state type
import localStore from '@/services/storage/localStore.service';
// Enhanced base query with automatic token refresh
const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      // Add default headers
      Object.entries(API_CONFIG.DEFAULT_HEADERS).forEach(([key, value]) => {
        headers.set(key, value);
      });

      // Add auth token if available
      const token = localStore.getApiToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 errors with automatic token refresh
  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth?.refreshToken;

    if (refreshToken) {
      // Attempt to refresh the token
      const refreshResult = await baseQuery(
        {
          url: API_CONFIG.ENDPOINTS.AUTH.REFRESH,
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, redirect to login
        console.warn('Token refresh failed, redirecting to login');
        // api.dispatch(logout());
      }
    } else {
      console.warn('No refresh token available');
      // api.dispatch(logout());
    }
  }

  return result;
};

// Create the base API slice
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Auth', 'Product'],
  endpoints: () => ({}),
  // Add keepUnusedDataFor for better caching
  keepUnusedDataFor: 300, // 5 minutes
});

export type BaseApiType = typeof baseApi;
