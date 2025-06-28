import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectAuthToken,
} from './slices/authSlice';
import { fetchUserProfile } from './thunks/authThunk';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Re-export for convenience
export { useDispatch, useSelector };

// Auth hook for easy access to auth state and actions
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);

  // Manually fetch user profile data and store in slice
  const getUserProfile = () => {
    dispatch(fetchUserProfile(undefined));
  };

  // Initialize auth - fetch user profile if token exists but no user data
  // This ensures complete user data is loaded when app starts
  const initializeAuth = () => {
    if (token && !user && !isLoading) {
      dispatch(fetchUserProfile(undefined));
    }
  };

  return {
    auth, // Complete auth state
    user, // Full user object from getCurrentUser API
    isAuthenticated,
    isLoading,
    error,
    token,
    getUserProfile, // Function to fetch and store user data
    initializeAuth, // Function to initialize user data on app start
  };
};
