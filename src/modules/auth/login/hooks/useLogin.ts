import routes from '@/navigation/routes';
import { NavigationProp } from '@/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { loginWithCredentials } from '@/state/thunks/authThunk';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@/state/slices/authSlice';
import type { LoginCredentials } from '@/types/api';
import localStore from '@/services/storage/localStore.service';

const useLogin = () => {
  const navigation = useNavigation<NavigationProp>();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: localStore.getUserCredential()?.username || '',
    password: localStore.getUserCredential()?.password || '',
  });
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const rememberMe = useRef(true);
  const handleLogin = useCallback(async () => {
    try {
      if (credentials.username && credentials.password) {
        // Real login with credentials
        const result = await dispatch(loginWithCredentials(credentials)).unwrap();
        if (result) {
          if (rememberMe.current) {
            localStore.setUserCredential({
              username: credentials.username,
              password: credentials.password,
            });
          }
          navigation.reset({
            index: 0,
            routes: [{ name: routes.bottomTab }],
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [dispatch, navigation, credentials]);
  const handleChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const handleRememberMe = () => {
    rememberMe.current = !rememberMe.current;
  };
  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.bottomTab }],
    });
  };
  return {
    isLoading: loading,
    handleLogin,
    authError,
    isAuthenticated,
    handleChange,
    credentials,
    handleRememberMe,
    handleSkip,
  };
};

export default useLogin;
