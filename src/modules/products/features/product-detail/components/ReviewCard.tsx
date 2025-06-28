import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import { ProductReview } from '../../../types/product.type';
import { RatingStars } from './RatingStars';

interface ReviewCardProps {
  review: ProductReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { gutters, borders, backgrounds } = useTheme();

  return (
    <View style={[backgrounds.gray10, borders.rounded_12, gutters.paddingVertical_16]}>
      <View style={[layout.row, layout.itemsCenter, gutters.marginBottom_8]}>
        <Text
          variant="body1"
          weight="semibold"
        >
          {review.reviewerName}
        </Text>
        <View style={gutters.marginLeft_8}>
          <RatingStars
            rating={review.rating}
            size={14}
          />
        </View>
      </View>
      <Text
        variant="body2"
        color="secondary"
        style={gutters.marginBottom_8}
      >
        {review.comment}
      </Text>
      <Text
        variant="body3"
        color="secondary"
      >
        {new Date(review.date).toLocaleDateString()}
      </Text>
    </View>
  );
};
