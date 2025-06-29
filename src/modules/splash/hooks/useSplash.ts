import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import routes from '@/navigation/routes';
import { NavigationProp, RootStackParamList } from '@/navigation/type';
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { selectAuthLoading, selectIsAuthenticated, selectAuthError } from '@/state/slices/authSlice';
import { fetchUserProfile } from '@/state/thunks/authThunk';
import localStore from '@/services/storage/localStore.service';

const SPLASH_DELAY = 2000;

const useSplash = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const hasNavigated = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const apiCallInProgress = useRef(false);

  const isAuthLoading = useAppSelector(selectAuthLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authError = useAppSelector(selectAuthError);

  const navigate = useCallback(
    (routeName: keyof RootStackParamList) => {
      if (hasNavigated.current) return;

      hasNavigated.current = true;
      setIsLoading(false);

      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    },
    [navigation]
  );

  const navigateWithDelay = useCallback(
    (routeName: keyof RootStackParamList) => {
      timeoutRef.current = setTimeout(() => {
        navigate(routeName);
      }, SPLASH_DELAY);
    },
    [navigate]
  );

  const checkAuthAndNavigate = useCallback(async () => {
    // Prevent multiple executions
    if (hasNavigated.current || apiCallInProgress.current) return;

    const apiToken = localStore.getApiToken();

    // Handle auth error case
    if (authError) {
      localStore.clearApiToken();
      navigateWithDelay(routes.login);
      return;
    }

    // No token case
    if (!apiToken) {
      navigateWithDelay(routes.login);
      return;
    }

    // Already authenticated case
    if (isAuthenticated) {
      navigateWithDelay(routes.bottomTab);
      return;
    }

    // If auth is loading from another source, wait for it to complete
    if (isAuthLoading) {
      return;
    }

    // Validate token case - only if no API call is in progress
    try {
      apiCallInProgress.current = true;
      await dispatch(fetchUserProfile()).unwrap();
      navigateWithDelay(routes.bottomTab);
    } catch (error) {
      console.warn('Token validation failed:', error);
      localStore.clearApiToken();
      navigateWithDelay(routes.login);
    } finally {
      apiCallInProgress.current = false;
    }
  }, [dispatch, navigateWithDelay, authError, isAuthenticated, isAuthLoading]);

  useEffect(() => {
    checkAuthAndNavigate();

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [checkAuthAndNavigate]);

  return {
    isLoading: isLoading || isAuthLoading,
  };
};

export default useSplash;
