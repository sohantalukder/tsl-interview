import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IProduct } from '../../../types/product.type';

interface UseProductDetailProps {
  productId: string;
}

interface UseProductDetailReturn {
  product: IProduct | null;
  loading: boolean;
  discountedPrice: number;
  fetchProduct: () => Promise<void>;
}

const useProductDetail = ({ productId }: UseProductDetailProps): UseProductDetailReturn => {
  const navigation = useNavigation();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${productId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const productData: IProduct = await response.json();
      setProduct(productData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product details. Please try again.');
      console.error('Error fetching product:', error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [productId, navigation]);

  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * (1 - product.discountPercentage / 100);
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    discountedPrice,
    fetchProduct,
  };
};

export default useProductDetail;
