import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../services/ApiClient';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';

// Import your page objects
import { Cart } from "../pages/Cart";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import { Checkout } from "../pages/Checkout";
// ...other page imports

// Define combined fixtures type
type CombinedFixtures = {
  // API fixtures
  apiClient: ApiClient;
  productService: ProductService;
  cartService: CartService;
  
  // UI fixtures
  loginPage: Login;
  productPage: Products;
  productDetailsPage: ProductDetails;
  cartPage: Cart;
  checkoutPage: Checkout;
  // ...other page objects
};

// Create a single test object with all fixtures
export const test = base.extend<CombinedFixtures>({
  // API fixtures
  apiClient: async ({ playwright }, use, testInfo) => {
    const baseURL = testInfo.project.use.baseURL || 'https://automationexercise.com';
    const client = new ApiClient(baseURL);
    await client.init();
    await use(client);
    await client.close();
  },
  
  productService: async ({ apiClient }, use) => {
    const service = new ProductService(apiClient);
    await use(service);
  },

  cartService: async ({ apiClient, page }, use) => {
    const service = new CartService(apiClient, page);
    await use(service);
  },
  
  // UI fixtures
  loginPage: async ({ page }, use) => {
    await use(new Login(page));
  },
  
  productPage: async ({ page }, use) => {
    await use(new Products(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetails(page));
  },
  
  cartPage: async ({ page }, use) => {
    await use(new Cart(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new Checkout(page));
  },
  // ...other page objects
});

// Export convenience methods
export const beforeEach = test.beforeEach;
export const beforeAll = test.beforeAll;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;
export const step = test.step;

// Re-export expect
export { expect };