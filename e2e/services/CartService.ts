import { ApiClient } from './ApiClient';

export class CartService {
  private client: ApiClient;
  private baseEndpoint = 'delete_cart/';

  constructor(client: ApiClient) {
    this.client = client;
  }

  async removeProductFromCart(itemsQuantity: number) {
    try {
      for (let i = 1; i <= itemsQuantity; i++) {
        await this.client.getMessage<string>(
          this.baseEndpoint + i, {
            cookies: {
              'csrftoken': 'pxbZEp5GpfACALM0TDloSZS0Yru8ObilLXO9FEGVfDjXJXSXsBShLm5BIulOOVnh',
              'sessionid': 'wfp4wusjyx3rar9p05fxg8rs25qcc1me'
            }
          }
        );
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500)); 
      }
      return true;
    } catch (error) {
      console.error('Error removing products from cart:', error);
      return false;
    }
  }
}