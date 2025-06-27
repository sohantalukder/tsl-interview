import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import TabIcon from './TabIcon';
import { TabBarItemProps } from './type';
import { Text } from '@/shared/components/atoms';

export const TabBarItem: React.FC<TabBarItemProps> = React.memo(
  ({
    tab,
    isActive,
    onPress,
    tabStyle,
    activeTabStyle,
    labelStyle,
    activeLabelStyle,
    iconSize,
    showLabels,
    activeColor,
    inactiveColor,
    badgeColor,
    badgeTextColor,
  }) => {
    const computedValues = useMemo(
      () => ({
        iconName: isActive && tab.activeIcon ? tab.activeIcon : tab.icon,
        iconColor: isActive ? activeColor : inactiveColor,
        textColor: isActive ? activeColor : inactiveColor,
      }),
      [isActive, tab.activeIcon, tab.icon, activeColor, inactiveColor]
    );

    const containerStyle = useMemo(
      () => [styles.tabItem, tabStyle, isActive && activeTabStyle],
      [tabStyle, isActive, activeTabStyle]
    );

    // Memoize the label styles
    const labelStyles = useMemo(
      () => [styles.label, { color: computedValues.textColor }, labelStyle, isActive && activeLabelStyle],
      [computedValues.textColor, labelStyle, isActive, activeLabelStyle]
    );

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={tab.label}
      >
        <TabIcon
          name={computedValues.iconName}
          size={iconSize}
          color={computedValues.iconColor}
          badge={tab.badge}
          badgeColor={badgeColor}
          badgeTextColor={badgeTextColor}
        />
        {showLabels && (
          <Text
            style={labelStyles}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {tab.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

// Add display name for better debugging
TabBarItem.displayName = 'TabBarItem';

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 60,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500', // Added font weight for better readability
  },
});
