import { baseApi } from './baseApi';
import { API_CONFIG } from '@/config';
import type { LoginCredentials, AuthResponse, ApiError } from '@/types/api';
import { IUser } from '@/modules/profile/types';
import localStore from '@/services/storage/localStore.service';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials, // Remove JSON.stringify - RTK Query handles this
      }),
      invalidatesTags: ['Auth'],
      transformErrorResponse: (response: any): ApiError => ({
        message: response.data?.message || 'Login failed',
        status: response.status,
        data: response.data,
      }),
    }),

    // Get current user profile
    getCurrentUser: builder.query<IUser, void>({
      query: () => ({
        url: API_CONFIG.ENDPOINTS.AUTH.ME,
        method: 'GET',
      }),
      providesTags: ['Auth'],
      transformErrorResponse: (response: any): ApiError => ({
        message: response.data?.message || 'Failed to fetch user profile',
        status: response.status,
        data: response.data,
      }),
    }),

    // Refresh token endpoint
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        method: 'POST',
        body: { refreshToken },
      }),
      invalidatesTags: ['Auth'],
      transformErrorResponse: (response: any): ApiError => ({
        message: response.data?.message || 'Token refresh failed',
        status: response.status,
        data: response.data,
      }),
    }),

    // Logout endpoint
    logout: builder.mutation<{ success: boolean }, void>({
      queryFn: async () => {
        localStore.clearApiToken();
        return { data: { success: true } };
      },
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
