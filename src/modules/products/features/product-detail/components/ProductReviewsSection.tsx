import React from 'react';
import { View } from 'react-native';
import { ProductReview } from '../../../types/product.type';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import rs from '@/shared/utilities/responsiveSize';
import { ReviewCard } from './ReviewCard';

interface ProductReviewsSectionProps {
  reviews: ProductReview[];
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ reviews }) => {
  const { gutters } = useTheme();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: rs(100) }}>
      <Text
        variant="heading3"
        weight="bold"
        style={gutters.marginBottom_16}
      >
        Customer Reviews
      </Text>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          review={review}
        />
      ))}
    </View>
  );
};
