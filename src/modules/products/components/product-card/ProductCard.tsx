import React, { useMemo, useCallback, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { IProduct } from '../../types/product.type';
import { IconByVariant, Image, Text } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import layout from '@/theme/layout';
import { useTheme } from '@/theme';

interface ProductCardProps {
  product: IProduct;
  onPress: (product: IProduct) => void;
  onToggleFavorite: (productId: number) => void;
  isFavorite: boolean;
}

// Constants - moved outside component to prevent recreation
const CARD_WIDTH = (rs('wf') - rs(64)) / 2;
const IMAGE_HEIGHT_RATIO = 0.8;
const DISCOUNT_THRESHOLD = 0;
const HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

// Utility functions
const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price * (1 - discountPercentage / 100);
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const formatDiscount = (discountPercentage: number): string => {
  return `-${Math.round(discountPercentage)}%`;
};

const getStockStatusColor = (stock: number, colors: any) => {
  if (stock > 10) return colors.success;
  if (stock > 0) return colors.warning;
  return colors.error;
};

const getStockStatusText = (stock: number): string => {
  return stock > 0 ? `${stock} left` : 'Out of stock';
};

export const ProductCard: React.FC<ProductCardProps> = memo(({ product, onPress, onToggleFavorite, isFavorite }) => {
  const { colors, gutters, borders, backgrounds } = useTheme();

  // Memoized calculations to prevent unnecessary recalculations
  const discountedPrice = useMemo(
    () => calculateDiscountedPrice(product.price, product.discountPercentage),
    [product.price, product.discountPercentage]
  );

  const hasDiscount = useMemo(() => product.discountPercentage > DISCOUNT_THRESHOLD, [product.discountPercentage]);

  const stockStatusColor = useMemo(() => getStockStatusColor(product.stock, colors), [product.stock, colors]);

  const stockStatusText = useMemo(() => getStockStatusText(product.stock), [product.stock]);

  // Memoized styles to prevent recreation on each render
  const containerStyle = useMemo(
    () => [backgrounds.background, borders.roundedBottom_16, { width: CARD_WIDTH }],
    [backgrounds.background, borders.roundedBottom_16]
  );

  const imageContainerStyle = useMemo(() => ({ height: CARD_WIDTH * IMAGE_HEIGHT_RATIO }), []);

  const favoriteButtonStyle = useMemo(
    () => [
      styles.favoriteButton,
      layout.absolute,
      layout.top_10,
      layout.right_10,
      backgrounds.background,
      borders.rounded_80,
      gutters.padding_6,
      {
        shadowColor: colors.background,
      },
    ],
    [backgrounds.background, borders.rounded_80, gutters.padding_6, colors.background]
  );

  const discountBadgeStyle = useMemo(
    () => [
      layout.absolute,
      gutters.paddingHorizontal_6,
      gutters.paddingVertical_4,
      borders.rounded_12,
      backgrounds.error,
      layout.top_10,
      layout.left_10,
    ],
    [gutters.paddingHorizontal_6, gutters.paddingVertical_4, borders.rounded_12, backgrounds.error]
  );

  const priceRowStyle = useMemo(
    () => [layout.row, layout.itemsCenter, gutters.marginVertical_4, gutters.gap_4],
    [gutters.marginVertical_4, gutters.gap_4]
  );

  const stockInfoRowStyle = useMemo(() => [layout.row, layout.itemsCenter, gutters.gap_12], [gutters.gap_12]);

  const ratingRowStyle = useMemo(() => [layout.row, layout.itemsCenter, gutters.gap_2], [gutters.gap_2]);

  const stockBadgeStyle = useMemo(
    () => [
      borders.rounded_8,
      gutters.paddingHorizontal_6,
      gutters.paddingVertical_2,
      layout.itemsCenter,
      { backgroundColor: stockStatusColor },
    ],
    [borders.rounded_8, gutters.paddingHorizontal_6, gutters.paddingVertical_2, stockStatusColor]
  );

  // Memoized event handlers to prevent function recreation
  const handlePress = useCallback(() => {
    onPress(product);
  }, [onPress, product]);

  const handleFavoritePress = useCallback(() => {
    onToggleFavorite(product.id);
  }, [onToggleFavorite, product.id]);

  return (
    <Pressable
      style={containerStyle}
      onPress={handlePress}
      android_ripple={{ color: colors.text, borderless: true }}
    >
      <View style={imageContainerStyle}>
        <Image
          source={{ uri: product.thumbnail }}
          style={[layout.fullWidth, layout.fullHeight]}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={favoriteButtonStyle}
          onPress={handleFavoritePress}
          hitSlop={HIT_SLOP}
          activeOpacity={0.7}
        >
          <IconByVariant
            path={isFavorite ? 'favoriteFill' : 'favorite'}
            color={isFavorite ? colors.error : colors.text}
          />
        </TouchableOpacity>

        {hasDiscount && (
          <View style={discountBadgeStyle}>
            <Text
              weight="bold"
              color="white"
              variant="body3"
            >
              {formatDiscount(product.discountPercentage)}
            </Text>
          </View>
        )}
      </View>

      <View style={gutters.padding_12}>
        <Text
          weight="bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {product.title}
        </Text>

        <View style={priceRowStyle}>
          <Text
            variant="body2"
            weight="bold"
          >
            {formatPrice(discountedPrice)}
          </Text>
          {hasDiscount && (
            <Text
              style={styles.originalPriceText}
              variant="body3"
            >
              {formatPrice(product.price)}
            </Text>
          )}
        </View>

        <View style={stockInfoRowStyle}>
          <View style={ratingRowStyle}>
            <Text variant="body2">{product.rating.toFixed(1)}</Text>
            <Text variant="body2">({product.reviews.length})</Text>
          </View>

          <View style={stockBadgeStyle}>
            <Text
              variant="body2"
              color="white"
            >
              {stockStatusText}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

// Set display name for better debugging
ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  favoriteButton: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
  },
});
