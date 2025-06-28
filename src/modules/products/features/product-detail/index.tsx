import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/shared/components/atoms';
import { SafeScreen } from '@/shared/components/templates';
import { useTheme } from '@/theme';
import layout from '@/theme/layout';
import { RootScreenProps } from '@/navigation/type';
import routes from '@/navigation/routes';
import {
  ProductDetailHeader,
  ProductInfoSection,
  BottomActionBar,
  ProductImageGallery,
  ProductDetailsSection,
  ProductTagsSection,
  ProductReviewsSection,
} from './components';
import { EmptyContent } from '@/shared/components/molecules';
import useProductDetail from './hooks/useProductDetail';

type ProductDetailsScreenProps = RootScreenProps<typeof routes.productDetail>;

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { id } = route.params;
  const { gutters } = useTheme();

  const { product, loading, discountedPrice } = useProductDetail({ productId: id });

  if (!product || loading) {
    return (
      <SafeScreen showHeader={false}>
        <ProductDetailHeader />
        <EmptyContent
          isLoading={loading}
          title="Product not found"
          description="Please try again later."
        />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen showHeader={false}>
      <ProductDetailHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={layout.flex_1}
      >
        {/* Product Images */}
        <ProductImageGallery
          images={product.images}
          thumbnail={product.thumbnail}
        />

        {/* Product Info Section - Now Scrollable */}
        <ProductInfoSection
          product={product}
          discountedPrice={discountedPrice}
        />

        {/* Product Details */}
        <View style={gutters.padding_16}>
          <Text
            variant="body1"
            color="secondary"
            style={gutters.marginBottom_24}
          >
            {product.description}
          </Text>

          {/* Product Details Section */}
          <ProductDetailsSection product={product} />

          {/* Tags Section */}
          <ProductTagsSection tags={product.tags} />

          {/* Reviews Section */}
          <ProductReviewsSection reviews={product.reviews} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <BottomActionBar
        price={discountedPrice}
        stock={product.stock}
        title={product.title}
      />
    </SafeScreen>
  );
};

export default ProductDetailsScreen;
