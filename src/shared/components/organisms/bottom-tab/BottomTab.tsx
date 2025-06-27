import React from 'react';
import { BottomTabNavigator } from '../../molecules';
import tabs from './constant';

const BottomTab = () => {
  return (
    <BottomTabNavigator
      tabs={tabs}
      initialTab={tabs[0].id}
    />
  );
};

export default BottomTab;
