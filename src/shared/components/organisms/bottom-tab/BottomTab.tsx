import React from 'react';
import { BottomTabNavigator } from '../../molecules';
import tabs from './constant';

const BottomTab = () => {
  return <BottomTabNavigator tabs={tabs} />;
};

export default BottomTab;
