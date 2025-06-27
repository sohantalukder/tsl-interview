import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ColorValue } from 'react-native';

export interface TabItem {
  readonly id: string;
  readonly label?: string;
  readonly icon: string;
  readonly activeIcon?: string;
  readonly component: React.ComponentType<any>;
  readonly badge?: number | string;
}

export interface TabBarProps {
  readonly tabs: TabItem[];
  readonly activeTab: string;
  readonly onTabPress: (tabId: string) => void;
  readonly style?: StyleProp<ViewStyle>;
  readonly tabStyle?: StyleProp<ViewStyle>;
  readonly activeTabStyle?: StyleProp<ViewStyle>;
  readonly labelStyle?: StyleProp<TextStyle>;
  readonly activeLabelStyle?: StyleProp<TextStyle>;
  readonly iconSize?: number;
  readonly showLabels?: boolean;
  readonly backgroundColor?: ColorValue;
  readonly activeColor?: ColorValue;
  readonly inactiveColor?: ColorValue;
  readonly badgeColor?: ColorValue;
  readonly badgeTextColor?: ColorValue;
}

export interface BottomTabNavigatorProps extends Omit<TabBarProps, 'activeTab' | 'onTabPress' | 'showLabels'> {
  readonly initialTab?: string;
  readonly onTabChange?: (tabId: string) => void;
}

export interface TabIconProps {
  readonly name: string;
  readonly size?: number;
  readonly color?: ColorValue;
  readonly badge?: number | string;
  readonly badgeColor?: ColorValue;
  readonly badgeTextColor?: ColorValue;
}

// Tab Bar Item Props
export interface TabBarItemProps {
  // Tab Item
  readonly tab: TabItem;
  // Is Active
  readonly isActive: boolean;
  // On Press
  readonly onPress: () => void;
  // Tab Style
  readonly tabStyle?: StyleProp<ViewStyle>;
  // Active Tab Style
  readonly activeTabStyle?: StyleProp<ViewStyle>;
  // Label Style
  readonly labelStyle?: StyleProp<TextStyle>;
  // Active Label Style
  readonly activeLabelStyle?: StyleProp<TextStyle>;
  // Icon Size
  readonly iconSize?: number;
  // Show Labels
  readonly showLabels?: boolean;
  // Active Color
  readonly activeColor?: ColorValue;
  // Inactive Color
  readonly inactiveColor?: ColorValue;
  // Badge Color
  readonly badgeColor?: ColorValue;
  // Badge Text Color
  readonly badgeTextColor?: ColorValue;
}
