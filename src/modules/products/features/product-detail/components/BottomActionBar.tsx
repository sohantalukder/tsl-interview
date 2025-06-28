import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { IconByVariant, Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import rs from '@/shared/utilities/responsiveSize';
import { staticFontStyles } from '@/theme/fonts';

interface BottomActionBarProps {
  price: number;
  stock: number;
  title: string;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({ price, stock, title }) => {
  const { colors, gutters, borders, backgrounds } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = useCallback(
    (increment: boolean) => {
      setQuantity((prev) => {
        if (increment) {
          return Math.min(stock, prev + 1);
        }
        return Math.max(1, prev - 1);
      });
    },
    [stock]
  );

  const handleAddToCart = useCallback(() => {
    Alert.alert('Added to Cart', `${quantity}x ${title} has been added to your cart.`, [{ text: 'OK' }]);
  }, [quantity, title]);
  const totalPrice = useMemo(() => {
    return price * quantity;
  }, [price, quantity]);
  return (
    <View
      style={[
        layout.absolute,
        layout.bottom0,
        layout.left0,
        layout.right0,
        backgrounds.white,
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_16,
        gutters.paddingBottom_32,
        borders.wTop_1,
        borders.gray8,
        layout.row,
        layout.itemsCenter,
        layout.justifyBetween,
      ]}
    >
      {/* Quantity Controls */}
      <View style={[layout.row, layout.itemsCenter, backgrounds.gray10, borders.rounded_12, gutters.padding_4]}>
        <TouchableOpacity
          style={[
            {
              width: rs(36),
              height: rs(36),
            },
            borders.rounded_8,
            backgrounds.white,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
          onPress={() => handleQuantityChange(false)}
          disabled={quantity <= 1}
        >
          <IconByVariant
            path="minus"
            color={quantity <= 1 ? colors.gray6 : colors.text}
          />
        </TouchableOpacity>
        <Text
          variant="body1"
          weight="semibold"
          style={[gutters.marginHorizontal_16, staticFontStyles.alignCenter, { minWidth: rs(20) }]}
        >
          {quantity}
        </Text>
        <TouchableOpacity
          style={[
            {
              width: rs(36),
              height: rs(36),
            },
            borders.rounded_8,
            backgrounds.white,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
          onPress={() => handleQuantityChange(true)}
          disabled={quantity >= stock}
        >
          <IconByVariant
            path="plus"
            color={quantity >= stock ? colors.gray6 : colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Price and Add to Cart */}
      <View style={[layout.flex_1, layout.row, layout.itemsCenter, layout.justifyEnd, gutters.marginLeft_16]}>
        <Text
          variant="heading3"
          weight="bold"
          style={gutters.marginRight_16}
        >
          ${totalPrice.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={[
            stock === 0 ? backgrounds.gray6 : backgrounds.primary,
            gutters.paddingHorizontal_24,
            gutters.paddingVertical_12,
            borders.rounded_12,
            { minWidth: rs(120) },
          ]}
          onPress={handleAddToCart}
          disabled={stock === 0}
        >
          <Text
            variant="body1"
            weight="semibold"
            color="white"
            style={{ textAlign: 'center' }}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
