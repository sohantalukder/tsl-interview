import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginCredentials } from '@/types/api';
import { authApi } from '../api/authApi';
import { setLoading, loginSuccess, loginFailure, logout, updateUser } from '../slices/authSlice';
import type { RootState } from '../store';
import localStore from '@/services/storage/localStore.service';

// Helper function to extract error message
const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object') {
    const errorObj = error as { data?: { message?: string }; message?: string };
    if (errorObj.data?.message) return errorObj.data.message;
    if (errorObj.message) return errorObj.message;
  }
  return defaultMessage;
};

// Login with credentials
export const loginWithCredentials = createAsyncThunk(
  'auth/loginWithCredentials',
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const result = await dispatch(authApi.endpoints.login.initiate(credentials));

      if (result.data) {
        dispatch(fetchUserProfile());
        localStore.setApiToken(result.data.token);
        return result.data;
      } else {
        const errorMessage = getErrorMessage(result.error, 'Login failed');
        dispatch(loginFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, 'Login failed');
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Refresh authentication token
export const refreshAuthToken = createAsyncThunk(
  'auth/refreshAuthToken',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        dispatch(logout());
        localStore.clearApiToken();
        return rejectWithValue('No refresh token available');
      }

      const result = await dispatch(authApi.endpoints.refreshToken.initiate({ refreshToken }));

      if (result.data) {
        dispatch(loginSuccess(result.data));
        localStore.setApiToken(result.data.token);
        return result.data;
      } else {
        const errorMessage = getErrorMessage(result.error, 'Token refresh failed');
        dispatch(logout());
        localStore.clearApiToken();
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      dispatch(logout());
      localStore.clearApiToken();
      return rejectWithValue(getErrorMessage(error, 'Token refresh failed'));
    }
  }
);

// Fetch current user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading(true));

    const result = await dispatch(authApi.endpoints.getCurrentUser.initiate());

    if (result.data) {
      dispatch(updateUser(result.data));
      dispatch(setLoading(false));
      return result.data;
    } else {
      const errorMessage = getErrorMessage(result.error, 'Failed to fetch user profile');
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Failed to fetch user profile');
    dispatch(loginFailure(errorMessage));
    return rejectWithValue(errorMessage);
  }
});

// Perform logout with cleanup
export const performLogout = createAsyncThunk('auth/performLogout', async (_, { dispatch }) => {
  try {
    // Call logout API
    await dispatch(authApi.endpoints.logout.initiate());
  } catch (error) {
    // Continue with logout even if API call fails
    console.warn('Logout API call failed:', error);
  } finally {
    // Always clear local state and cache
    dispatch(logout());
    localStore.clearApiToken();
    dispatch(authApi.util.resetApiState());
  }

  return { success: true };
});
