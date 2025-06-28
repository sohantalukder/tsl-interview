import React from 'react';
import { View } from 'react-native';
import { IProduct } from '../../../types/product.type';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';

interface ProductDetailsSectionProps {
  product: IProduct;
}

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ product }) => {
  const { gutters, borders } = useTheme();

  const details = [
    { label: 'SKU', value: product.sku },
    { label: 'Weight', value: `${product.weight} oz` },
    {
      label: 'Dimensions',
      value: `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`,
    },
    {
      label: 'Stock',
      value: product.stock > 0 ? `${product.stock} available` : 'Out of stock',
      color: product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error',
    },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Shipping', value: product.shippingInformation },
    { label: 'Return Policy', value: product.returnPolicy },
  ];

  return (
    <View style={gutters.marginBottom_24}>
      <Text
        variant="heading3"
        weight="bold"
        style={gutters.marginBottom_16}
      >
        Product Details
      </Text>

      {details.map((detail, index) => (
        <View
          key={index}
          style={[
            layout.row,
            layout.justifyBetween,
            layout.itemsStart,
            gutters.paddingVertical_8,
            borders.wBottom_1,
            borders.gray8,
          ]}
        >
          <Text
            variant="body2"
            color="secondary"
            weight="medium"
            style={layout.flex_1}
          >
            {detail.label}:
          </Text>
          <Text
            variant="body2"
            color={(detail.color as any) || 'default'}
            weight="regular"
            // eslint-disable-next-line react-native/no-inline-styles
            style={[{ flex: 2, textAlign: 'right' }]}
          >
            {detail.value}
          </Text>
        </View>
      ))}
    </View>
  );
};
