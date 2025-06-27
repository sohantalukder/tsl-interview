import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconByVariant, Text } from '@/shared/components/atoms';
import { TabIconProps } from './type';

const TabIcon: React.FC<TabIconProps> = React.memo(({ name, size, color, badge, badgeColor, badgeTextColor }) => {
  const badgeText = useMemo(() => {
    if (!badge) return null;
    return typeof badge === 'number' && badge > 99 ? '99+' : String(badge);
  }, [badge]);

  const badgeStyles = useMemo(() => [styles.badge, { backgroundColor: badgeColor }], [badgeColor]);

  const badgeTextStyles = useMemo(() => [styles.badgeText, { color: badgeTextColor }], [badgeTextColor]);

  return (
    <View style={styles.iconContainer}>
      <IconByVariant
        path={name}
        height={size}
        width={size}
        color={color}
      />
      {badge && (
        <View style={badgeStyles}>
          <Text
            style={badgeTextStyles}
            allowFontScaling={false}
          >
            {badgeText}
          </Text>
        </View>
      )}
    </View>
  );
});

TabIcon.displayName = 'TabIcon';

export default TabIcon;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
