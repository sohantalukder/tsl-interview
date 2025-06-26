import { useState, useEffect, useCallback, useRef } from 'react';
import { InteractionManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import routes from '@/navigation/routes';
import { NavigationProp } from '@/navigation/type';

const useSplash = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, _setIsLoading] = useState(true);
  const hasNavigated = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  const navigate = useCallback(
    () => {
      if (hasNavigated.current) return;

      hasNavigated.current = true;

      // Determine route based on user data
      let routeName = routes.login;
     

      navigation.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
    },
    [navigation]
  );

  const checkAuthAndNavigate = useCallback(async () => {
        // Not logged in, navigate to login after minimum splash time
        timeoutRef.current = setTimeout(() => {
          navigate();
        }, 2000);
  }, [navigate]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      checkAuthAndNavigate();
    });

    // Cleanup function
    return () => {
      task.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [checkAuthAndNavigate]);

  return {
    isLoading: isLoading ,
  };
};

export default useSplash;
