import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@/theme';
import basicRoutes from './features/basic';
import { RouteProps, RootStackParamList } from './type';
  import routes from './routes';
import { screenOptions } from './screenOptions';
const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { navigationTheme, variant } = useTheme();
  const renderRoutes = (values: RouteProps[]) => {
    return values.map((route) => ({
      ...route,
      component: route.component,
    }));
  };
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={routes.splash}
        key={variant}
        screenOptions={screenOptions}
      >
        {renderRoutes(basicRoutes).map((route: RouteProps) => (
          <Stack.Screen
            key={route.name}
            name={route.name as keyof RootStackParamList}
            component={route.component}
            options={route.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
