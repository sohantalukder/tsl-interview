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
  [routes.productDetail]: { id: string; title: string };
  [routes.profile]: undefined;
  [routes.bottomTab]: undefined;
};

export type RouteProps = {
  name: string;
  component: React.FC<RootScreenProps>;
  title?: string;
  options?: StackNavigationOptions;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;
