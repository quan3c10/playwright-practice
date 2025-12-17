import { ApiClient } from './ApiClient';
import { Page } from '@playwright/test';

export class CartService {
  private client: ApiClient;
  private page: Page;
  private baseEndpoint = 'delete_cart/';

  constructor(client: ApiClient, page: Page) {
    this.client = client;
    this.page = page;
  }

  /**
   * Extract cookies from the browser context to use in API calls
   */
  private async getCookiesFromBrowser(): Promise<Record<string, string>> {
    const cookies = await this.page.context().cookies();
    const cookieMap: Record<string, string> = {};

    cookies.forEach(cookie => {
      cookieMap[cookie.name] = cookie.value;
    });

    return cookieMap;
  }

  async removeProductFromCart(itemsQuantity: number) {
    try {
      // Get cookies from the logged-in browser session
      const browserCookies = await this.getCookiesFromBrowser();

      for (let i = 1; i <= itemsQuantity; i++) {
        await this.client.getMessage<string>(
          this.baseEndpoint + i, {
            cookies: browserCookies
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