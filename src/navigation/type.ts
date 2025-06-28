import routes from '@/navigation/routes';
import type { StackNavigationOptions, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

export type RootScreenProps<S extends keyof RootStackParamList = keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  S
>;

export type RootStackParamList = {
  [routes.splash]: undefined;
  [routes.login]: undefined;
  [routes.home]: undefined;
  [routes.favorites]: undefined;
  [routes.mapView]: undefined;
  [routes.productDetail]: { id: string };
  [routes.profile]: undefined;
  [routes.bottomTab]: undefined;
};

export type RouteProps<T extends keyof RootStackParamList = keyof RootStackParamList> = {
  name: T;
  component: React.FC<RootScreenProps<T>>;
  title?: string;
  options?: StackNavigationOptions;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
