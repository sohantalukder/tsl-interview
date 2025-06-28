import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconByVariant, Text } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';

interface FavoritesHeaderProps {
  favoritesCount: number;
  onClearAll: () => void;
}

export const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({ favoritesCount, onClearAll }) => {
  const { colors, gutters, borders, backgrounds } = useTheme();

  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        layout.justifyBetween,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_12,
        backgrounds.background,
      ]}
    >
      <View>
        <Text
          variant="heading2"
          weight="bold"
        >
          My Favorites
        </Text>
        <Text
          variant="body2"
          color="secondary"
        >
          {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {favoritesCount > 0 && (
        <TouchableOpacity
          style={[
            layout.row,
            layout.itemsCenter,
            gutters.gap_6,
            gutters.paddingHorizontal_16,
            gutters.paddingVertical_10,
            borders.rounded_12,
            borders.w_1,
            {
              backgroundColor: colors.error + '10',
              borderColor: colors.error + '20',
            },
          ]}
          onPress={onClearAll}
          activeOpacity={0.8}
        >
          <IconByVariant
            path="delete"
            color={colors.error}
            width={rs(18)}
            height={rs(18)}
          />
          <Text
            variant="body1"
            color="error"
            weight="semibold"
          >
            Clear All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
