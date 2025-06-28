import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconByVariant, Text } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';

export const EmptyFavorites: React.FC = () => {
  const { colors, gutters, borders, backgrounds } = useTheme();

  return (
    <View style={[layout.flex_1, layout.justifyCenter, layout.itemsCenter, gutters.padding_24]}>
      <View
        style={[
          styles.iconContainer,
          backgrounds.gray10,
          borders.rounded_80,
          gutters.padding_24,
          gutters.marginBottom_24,
        ]}
      >
        <IconByVariant
          path="favorite"
          color={colors.gray2}
          width={rs(48)}
          height={rs(48)}
        />
      </View>

      <Text
        variant="heading2"
        weight="bold"
        style={[gutters.marginBottom_8, styles.centerText]}
      >
        No Favorites Yet
      </Text>

      <Text
        variant="body1"
        color="secondary"
        style={[styles.centerText, gutters.marginBottom_24, { maxWidth: rs(280) }]}
      >
        Start adding products to your favorites to see them here. Your favorite items will be saved for easy access.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
});
