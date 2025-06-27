import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarItem } from './TabBarItem';
import { TabBarProps } from './type';
import { useTheme } from '@/theme';
import { Colors } from '@/theme/types/colors';
import layout from '@/theme/layout';

export const TabBar: React.FC<TabBarProps> = React.memo(
  ({
    tabs,
    activeTab,
    onTabPress,
    style,
    tabStyle,
    activeTabStyle,
    labelStyle,
    activeLabelStyle,
    iconSize,
    showLabels = false,
    backgroundColor,
    activeColor,
    inactiveColor,
    badgeColor,
    badgeTextColor,
  }) => {
    const { colors, backgrounds } = useTheme();

    const computedColors = useMemo(
      () => ({
        active: activeColor ?? colors.primary,
        inactive: inactiveColor ?? colors.gray2,
        badge: badgeColor ?? colors.error,
        badgeText: badgeTextColor ?? colors.white,
        background: backgroundColor ?? backgrounds.background.backgroundColor,
      }),
      [
        activeColor,
        colors.primary,
        inactiveColor,
        colors.gray2,
        badgeColor,
        colors.error,
        badgeTextColor,
        colors.white,
        backgroundColor,
        backgrounds.background,
      ]
    );

    const containerStyles = useMemo(
      () => [styles(colors).container, layout.row, { backgroundColor: computedColors.background }, style],
      [colors, computedColors.background, style]
    );

    const createTabPressHandler = useCallback(
      (tabId: string) => () => {
        onTabPress(tabId);
      },
      [onTabPress]
    );

    const renderTabs = useMemo(() => {
      return tabs.map((tab) => (
        <TabBarItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onPress={createTabPressHandler(tab.id)}
          tabStyle={tabStyle}
          activeTabStyle={activeTabStyle}
          labelStyle={labelStyle}
          activeLabelStyle={activeLabelStyle}
          iconSize={iconSize}
          showLabels={showLabels}
          activeColor={computedColors.active}
          inactiveColor={computedColors.inactive}
          badgeColor={computedColors.badge}
          badgeTextColor={computedColors.badgeText}
        />
      ));
    }, [
      tabs,
      activeTab,
      createTabPressHandler,
      tabStyle,
      activeTabStyle,
      labelStyle,
      activeLabelStyle,
      iconSize,
      showLabels,
      computedColors,
    ]);

    return <View style={containerStyles}>{renderTabs}</View>;
  }
);

// Add display name for better debugging
TabBar.displayName = 'TabBar';

// Memoize styles function to avoid recreation
const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.gray6,
      paddingBottom: 34, // Safe area padding for iOS
      elevation: 8,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: colors.black ?? '#000', // Added explicit shadow color
    },
  });
