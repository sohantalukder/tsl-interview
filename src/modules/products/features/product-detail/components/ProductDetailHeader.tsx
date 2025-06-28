import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconByVariant } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import rs from '@/shared/utilities/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { FavoriteItem } from '@/types/api';
import { IProduct } from '../../../types/product.type';
import { selectFavorites, toggleFavorite } from '@/state/slices/favoritesSlice';
import routes from '@/navigation/routes';
import { NavigationProp } from '@/navigation/type';

export const ProductDetailHeader = ({ product }: { product?: IProduct }) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, gutters, borders, backgrounds } = useTheme();
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const isFavorite = useMemo(
    () => favorites.some((favorite: FavoriteItem) => favorite.id === product?.id),
    [favorites, product?.id]
  );

  const headerButtonStyle = useMemo(
    () => [
      {
        width: rs(44),
        height: rs(44),
        borderRadius: rs(22),
      },
      backgrounds.background,
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
    [backgrounds.background, borders.rounded_80, colors.black]
  );
  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(routes.home);
    }
  }, [navigation]);
  const handleFavoritePress = useCallback(() => {
    if (product) {
      dispatch(toggleFavorite(product));
    }
  }, [product, dispatch]);

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
