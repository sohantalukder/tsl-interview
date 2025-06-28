import React, { useMemo } from 'react';
import { BottomTabNavigator } from '../../molecules';
import tabs from './constant';
import { useAppSelector } from '@/state/hooks';
import { selectFavoritesCount } from '@/state/slices/favoritesSlice';
const BottomTab = () => {
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const updatedTabs = useMemo(() => {
    return tabs.map((tab, index) => {
      if (index === 1) {
        // favorites tab is at index 1
        return { ...tab, badge: favoritesCount.toString() };
      }
      return tab;
    });
  }, [favoritesCount]);
  return <BottomTabNavigator tabs={updatedTabs} />;
};

export default BottomTab;
