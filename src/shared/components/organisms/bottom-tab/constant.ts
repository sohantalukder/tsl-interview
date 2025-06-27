import FavoritesIndex from '@/modules/favorites';
import HomeIndex from '@/modules/home';
import MapViewIndex from '@/modules/map-view';
import { TabItem } from '../../molecules/bottom-tab/type';
const tabs: TabItem[] = [
  {
    id: 'home',
    icon: 'home',
    activeIcon: 'homeFill',
    component: HomeIndex,
  },
  {
    id: 'favorite',
    icon: 'favorite',
    activeIcon: 'favoriteFill',
    badge: 10,
    component: FavoritesIndex,
  },
  {
    id: 'map',
    icon: 'map',
    activeIcon: 'mapFill',
    component: MapViewIndex,
  },
];

export default tabs;
