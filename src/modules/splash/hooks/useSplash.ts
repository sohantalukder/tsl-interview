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
    if (isAuthLoading || hasNavigated.current) return;

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
      navigateWithDelay(routes.home);
      return;
    }

    // Validate token case
    try {
      await dispatch(fetchUserProfile()).unwrap();
      navigateWithDelay(routes.home);
    } catch (error) {
      console.warn('Token validation failed:', error);
      localStore.clearApiToken();
      navigateWithDelay(routes.login);
    }
  }, [dispatch, navigateWithDelay, isAuthLoading, isAuthenticated, authError]);

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
