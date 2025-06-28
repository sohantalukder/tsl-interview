import LoginIndex from '@/modules/auth/login';
import routes from '../routes';
import { RouteProps } from '../type';
import SplashIndex from '@/modules/splash';
import HomeIndex from '@/modules/home';
import MapViewIndex from '@/modules/map-view';
import FavoritesIndex from '@/modules/favorites';
import { ProductDetailsScreen } from '@/modules/products/features/product-detail';
import ProfileIndex from '@/modules/profile';
import BottomTab from '@/shared/components/organisms/bottom-tab/BottomTab';

const basicRoutes: RouteProps<keyof import('../type').RootStackParamList>[] = [
  { name: routes.splash, component: SplashIndex },
  { name: routes.login, component: LoginIndex },
  {
    name: routes.home,
    component: HomeIndex,
  },
  {
    name: routes.favorites,
    component: FavoritesIndex,
  },
  {
    name: routes.mapView,
    component: MapViewIndex,
  },
  {
    name: routes.productDetail,
    component: ProductDetailsScreen as React.FC<
      import('../type').RootScreenProps<keyof import('../type').RootStackParamList>
    >,
  },
  {
    name: routes.profile,
    component: ProfileIndex,
  },
  {
    name: routes.bottomTab,
    component: BottomTab,
  },
];

export default basicRoutes;
