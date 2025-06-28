import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import { IProduct } from '../../../types/product.type';
import { RatingStars } from './RatingStars';

interface ProductInfoSectionProps {
  product: IProduct;
  discountedPrice: number;
}

export const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product, discountedPrice }) => {
  const { colors, gutters, backgrounds } = useTheme();

  return (
    <View
      style={[
        backgrounds.white,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_20,
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.gray8,
        },
      ]}
    >
      {/* Brand and Category */}
      <View style={[layout.row, layout.justifyBetween, layout.itemsCenter, gutters.marginBottom_8]}>
        <Text
          variant="body3"
          color="primary"
          weight="semibold"
          style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          {product.brand}
        </Text>
        <Text
          variant="body3"
          color="secondary"
          style={{ textTransform: 'capitalize' }}
        >
          {product.category}
        </Text>
      </View>

      {/* Product Title */}
      <Text
        variant="heading2"
        weight="bold"
        color="default"
        style={gutters.marginBottom_12}
      >
        {product.title}
      </Text>

      {/* Rating and Reviews */}
      <View style={[layout.row, layout.itemsCenter, gutters.marginBottom_16]}>
        <RatingStars rating={product.rating} />
        <Text
          variant="body1"
          weight="semibold"
          style={gutters.marginLeft_8}
        >
          {product.rating}
        </Text>
        <Text
          variant="body2"
          color="secondary"
          style={gutters.marginLeft_8}
        >
          ({product.reviews.length} reviews)
        </Text>
      </View>

      {/* Price */}
      <View style={[layout.row, layout.itemsCenter]}>
        <Text
          variant="heading1"
          weight="bold"
          color="default"
        >
          ${discountedPrice.toFixed(2)}
        </Text>
        {product.discountPercentage > 0 && (
          <Text
            variant="body1"
            color="secondary"
            style={[gutters.marginLeft_12, { textDecorationLine: 'line-through' }]}
          >
            ${product.price.toFixed(2)}
          </Text>
        )}
      </View>
    </View>
  );
};
