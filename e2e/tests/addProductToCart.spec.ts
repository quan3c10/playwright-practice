import { products } from '../data/Products'
import { users } from '../data/Users'
import { test, expect } from '../fixture/fixtures';

// Configure for parallel execution
test.describe.configure({ mode: 'parallel' });

// Create completely isolated tests
test.describe('Product cart operations', () => {
  // Setup before each test
  test.beforeEach(async ({ loginPage, cartPage, cartService }) => {
    const user = users['quan.uh'];
    
    // Step 1: Login with user credentials
    await test.step('Login with user credentials', async () => {
      await loginPage.open();
      await loginPage.loginWith(user.email, user.password);
    });
    
    // Step 2: Clear cart to ensure clean state
    await test.step('Clear cart for clean test state', async () => {
      const cartQuantity = await cartPage.getCartQuantity();
      if (cartQuantity > 0) {
        await cartService.removeProductFromCart(cartQuantity);
        // Wait for cart to be empty in the UI with improved retry logic
        await expect.poll(
          async () => {
            await cartPage.open();
            return await cartPage.getCartQuantity();
          }, 
          { 
            timeout: 15000,
            intervals: [1000, 2000, 3000, 5000],
            message: 'Cart should be empty before starting the test'
          }
        ).toBe(0);
      }
    });
  });
  
  test('Verify adding product to cart successfully', async ({ productPage, cartPage }) => {
    const product = products['blue.top'];
    
    await test.step('Search and add product to cart', async () => {
      await productPage.open();
      await productPage.addToCart(product.name);
    });
  
    await test.step('Verify product added to cart with correct information', async () => {
      await cartPage.open();
      await cartPage.verifyProductInfo(product);
    });
  });
  
  test('Verify adding multiple products to cart successfully', async ({ productPage, productDetailsPage, cartPage }) => {
    const product1 = products['blue.top'];
    const product2 = products['men.tshirt'];  
  
    await test.step('Add first product to cart', async () => {
      await productPage.open();
      await productPage.addToCart(product1.name);
    });
    
    await test.step('Add second product to cart', async () => {
      await productPage.viewProduct(product2.name);
      // Wait for product details page to load completely
      await productDetailsPage.addToCart(product2.quantity);
    });
  
    await test.step('Verify products added to cart with correct information', async () => {
      await cartPage.open();
      await cartPage.verifyProductInfo(product1);
      await cartPage.verifyProductInfo(product2);
    });
  });
  
  test('Verify checkout multiple products successfully', async ({ productPage, cartPage, checkoutPage }) => {
    const product1 = products['blue.top'];
    const product2 = products['men.tshirt'];  
    const user = users['quan.uh'];
  
    await test.step('Add first product to cart', async () => {
      await productPage.open();
      await productPage.addToCart(product1.name);
    });
    
    await test.step('Add second product to cart', async () => {
      await productPage.addToCart(product2.name, product2.quantity);
    });
  
    await test.step('Checkout the order', async () => {
      await cartPage.open();
      await cartPage.checkout();
    });
  
    await test.step('Verify products in checkout with correct information', async () => {
      await checkoutPage.open();
      await checkoutPage.verifyBillingAddress(user);
      await checkoutPage.verifyDeliveryAddress(user);
      await checkoutPage.verifyProductInfo(product1);
      await checkoutPage.verifyProductInfo(product2);
    });
  });
});
