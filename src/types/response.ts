export interface IResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface MutationResponse<T> {
  data: IResponse<T>;
  status: string;
  message: string;
}
