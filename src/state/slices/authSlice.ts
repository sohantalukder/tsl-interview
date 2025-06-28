import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse } from '@/types/api';
import { IUser } from '@/modules/profile/types';

export interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      const { token, refreshToken, ...userData } = action.payload;
      state.user = userData as IUser;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      Object.assign(state, initialState);
    },

    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateTokens: (state, action: PayloadAction<{ token: string; refreshToken?: string }>) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout, updateUser, updateTokens, clearError } =
  authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
