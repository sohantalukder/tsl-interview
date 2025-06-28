import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import rs from '@/shared/utilities/responsiveSize';

const width = rs('wf');

interface ProductImageGalleryProps {
  images: string[];
  thumbnail: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, thumbnail }) => {
  const { colors, gutters, borders } = useTheme();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <View style={layout.relative}>
      <Image
        source={{ uri: images[selectedImageIndex] || thumbnail }}
        style={{
          width,
          height: width,
          backgroundColor: colors.gray10,
        }}
        resizeMode="cover"
      />

      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[gutters.marginTop_16, gutters.paddingHorizontal_16]}
          contentContainerStyle={gutters.paddingRight_16}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImageIndex(index)}
              style={[
                {
                  width: rs(60),
                  height: rs(60),
                  marginRight: rs(12),
                },
                borders.rounded_8,
                borders.w_2,

                {
                  borderColor: selectedImageIndex === index ? colors.primary : colors.transparent,
                },
                layout.overflowHidden,
              ]}
            >
              <Image
                source={{ uri: image }}
                style={[layout.fullWidth, layout.fullHeight]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
