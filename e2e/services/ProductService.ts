import { ApiClient } from '../services/ApiClient';
import { CreateProductRequest, ProductResponse, ProductListResponse } from '../models/api/CreateProduct';

export class ProductService {
  private client: ApiClient;
  private baseEndpoint = '/api/productsList';
  
  constructor(client: ApiClient) {
    this.client = client;
  }
  
  async getAllProducts(): Promise<ProductListResponse> {
    return this.client.getJson<ProductListResponse>(this.baseEndpoint);
  }
  
  async getProductById(id: string): Promise<ProductResponse> {
    return this.client.getJson<ProductResponse>(`${this.baseEndpoint}/${id}`);
  }
  
  async createProduct(product: CreateProductRequest): Promise<ProductResponse> {
    return this.client.postJson<ProductResponse>(`${this.baseEndpoint}/create`, {data: product});
  }
  
  async updateProduct(id: string, product: Partial<CreateProductRequest>): Promise<ProductResponse> {
    return this.client.putJson<ProductResponse>(`${this.baseEndpoint}/${id}`, {data: product});
  }
  
  async deleteProduct(id: string): Promise<{ success: boolean }> {
    return this.client.deleteJson<{ success: boolean }>(`${this.baseEndpoint}/${id}`);
  }
  
  async searchProducts(term: string): Promise<ProductListResponse> {
    return this.client.getJson<ProductListResponse>(`${this.baseEndpoint}/search`, { data: term });
  }
}