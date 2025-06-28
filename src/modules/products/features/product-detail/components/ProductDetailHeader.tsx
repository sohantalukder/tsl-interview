import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconByVariant } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import rs from '@/shared/utilities/responsiveSize';
import { useNavigation } from '@react-navigation/native';

export const ProductDetailHeader = () => {
  const navigation = useNavigation();
  const { colors, gutters, borders, backgrounds } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const headerButtonStyle = useMemo(
    () => [
      {
        width: rs(44),
        height: rs(44),
        borderRadius: rs(22),
      },
      backgrounds.white,
      borders.rounded_80,
      layout.justifyCenter,
      layout.itemsCenter,
      {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
    ],
    [backgrounds.white, borders.rounded_80, colors.black]
  );
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const handleFavoritePress = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_48,
        layout.absolute,
        layout.top_10,
        layout.fullWidth,
        layout.z10,
      ]}
    >
      <TouchableOpacity
        style={headerButtonStyle}
        onPress={handleBack}
      >
        <IconByVariant
          path="leftArrow"
          color={colors.text}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={headerButtonStyle}
        onPress={handleFavoritePress}
      >
        <IconByVariant
          path={isFavorite ? 'favoriteFill' : 'favorite'}
          color={isFavorite ? colors.error : colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};
