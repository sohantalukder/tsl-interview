import React from 'react';
import { ColorValue } from 'react-native';

export interface TabItem {
  readonly id: string;
  readonly label?: string;
  readonly icon: string;
  readonly activeIcon?: string;
  readonly component: React.ComponentType<any>;
  readonly badge?: number | string;
}

export interface TabIconProps {
  readonly name: string;
  readonly size?: number;
  readonly color?: ColorValue;
  readonly badge?: number | string;
  readonly badgeColor?: ColorValue;
  readonly badgeTextColor?: ColorValue;
}
