import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import rs from '@/shared/utilities/responsiveSize';

interface ProductTagsSectionProps {
  tags: string[];
}

export const ProductTagsSection: React.FC<ProductTagsSectionProps> = ({ tags }) => {
  const { colors, gutters, borders, backgrounds } = useTheme();

  if (tags.length === 0) {
    return null;
  }

  return (
    <View style={gutters.marginBottom_24}>
      <Text
        variant="heading3"
        weight="bold"
        style={gutters.marginBottom_16}
      >
        Tags
      </Text>
      <View style={[layout.row, layout.wrap, { gap: rs(8) }]}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={[
              backgrounds.primary,
              gutters.paddingHorizontal_12,
              gutters.paddingVertical_6,
              borders.rounded_16,
              { backgroundColor: colors.primary + '20' },
              borders.w_1,
              borders.primary,
            ]}
          >
            <Text
              variant="body3"
              color="primary"
              weight="medium"
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
