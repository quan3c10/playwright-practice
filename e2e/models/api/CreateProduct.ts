export interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  brand?: string;
  description?: string;
}

// filepath: e2e/api/models/response/ProductResponse.ts
export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  brand?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  products: ProductResponse[];
  count: number;
  responseCode: number;
  message: string;
}