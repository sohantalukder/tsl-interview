export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
    },
    // Products endpoints
    PRODUCTS: {
      LIST: '/products',
      SEARCH: '/products/search',
      CATEGORIES: '/products/categories',
      CATEGORY: '/products/category',
    },
    // User endpoints
    USERS: {
      LIST: '/users',
      ME: '/user/me',
    },
  },
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    DEFAULT_SKIP: 0,
  },
} as const;

export type ApiConfig = typeof API_CONFIG;
