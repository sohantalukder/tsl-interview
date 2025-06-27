import FavoritesIndex from '@/modules/favorites';
import HomeIndex from '@/modules/home';
import MapViewIndex from '@/modules/map-view';
import { TabItem } from '../../molecules/bottom-tab/type';
import routes from '@/navigation/routes';

const tabs: TabItem[] = [
  {
    id: routes.home,
    icon: 'home',
    activeIcon: 'homeFill',
    component: HomeIndex,
  },
  {
    id: routes.favorites,
    icon: 'favorite',
    activeIcon: 'favoriteFill',
    badge: 10,
    component: FavoritesIndex,
  },
  {
    id: routes.mapView,
    icon: 'map',
    activeIcon: 'mapFill',
    component: MapViewIndex,
  },
];

export default tabs;
