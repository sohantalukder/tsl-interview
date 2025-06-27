import routes from '@/navigation/routes';
import { NavigationProp } from '@/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        navigation.navigate(routes.home);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLoading);
  return { isLoading, handleLogin };
};

export default useLogin;
