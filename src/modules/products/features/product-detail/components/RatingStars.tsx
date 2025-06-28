import React, { useMemo } from 'react';
import { View } from 'react-native';
import { IconByVariant } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16 }) => {
  const { colors } = useTheme();

  const stars = useMemo(() => {
    const starArray = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starArray.push(
        <IconByVariant
          key={`full-${i}`}
          path="favorite"
          color={colors.warning}
          width={size}
          height={size}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      starArray.push(
        <IconByVariant
          key="half"
          path="favorite"
          color={colors.warning}
          width={size}
          height={size}
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      starArray.push(
        <IconByVariant
          key={`empty-${i}`}
          path="favorite"
          color={colors.gray6}
          width={size}
          height={size}
        />
      );
    }

    return starArray;
  }, [rating, colors.warning, colors.gray6, size]);

  return <View style={[layout.row, { gap: 2 }]}>{stars}</View>;
};
