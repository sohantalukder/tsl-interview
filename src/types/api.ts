import { IProduct } from '@/modules/products/types/product.type';

export interface PaginatedResponse<T> {
  products?: T[];
  users?: T[];
  total: number;
  skip: number;
  limit: number;
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface ProductsResponse extends PaginatedResponse<IProduct> {
  products: IProduct[];
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Favorites types
export interface FavoriteItem {
  id: number;
  product: IProduct;
  addedAt: string;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}
