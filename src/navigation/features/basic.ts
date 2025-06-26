import LoginIndex from '@/modules/auth/login';
import routes from '../routes';
import { RouteProps } from '../type';
import SplashIndex from '@/modules/splash';
import HomeIndex from '@/modules/home';
import MapViewIndex from '@/modules/map-view';
import FavoritesIndex from '@/modules/favorites';
import ProductDetail from '@/modules/products/features/product-detail';
import ProfileIndex from '@/modules/profile';
const basicRoutes: RouteProps[] = [
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
    component: ProductDetail,
  },
  {
    name: routes.profile,
    component: ProfileIndex,
  },
];

export default basicRoutes;
