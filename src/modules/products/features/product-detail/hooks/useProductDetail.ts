import { useMemo } from 'react';
import { useGetProductQuery } from '@/state/api/productsApi';
import { IProduct } from '../../../types/product.type';

interface UseProductDetailProps {
  productId: string;
}

interface UseProductDetailReturn {
  product: IProduct | null;
  loading: boolean;
  discountedPrice: number;
  fetchProduct: () => void;
  error: string | undefined;
}

const useProductDetail = ({ productId }: UseProductDetailProps): UseProductDetailReturn => {
  const {
    data: product,
    isLoading: loading,
    error,
    refetch,
  } = useGetProductQuery(productId, {
    skip: !productId, // Skip query if no productId
  });

  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * (1 - product.discountPercentage / 100);
  }, [product]);

  const fetchProduct = () => {
    refetch();
  };

  return {
    product: product || null,
    loading,
    discountedPrice,
    fetchProduct,
    error: error ? 'Failed to fetch product details' : undefined,
  };
};

export default useProductDetail;
