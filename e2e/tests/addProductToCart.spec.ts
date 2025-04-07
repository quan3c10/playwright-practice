import { products } from '../data/Products'
import { test, beforeEach, step } from '../fixture/pages';

beforeEach(async ({ loginPage }) => {
  await step('Login with default credentials', async () => {
    await loginPage.open();
    await loginPage.loginWithDefaultCredentials();
  }); 
});

test('Verify adding product to cart successfully', async ({ productPage, cartPage }) => {

  const product = products['blue.top'];

  await step('Search and add product to cart', async () => {
    await productPage.open();
    await productPage.addToCart(product.name);
  });

  await step('Verify product added to cart with correct information', async () => {
    await productPage.viewCart();
    await cartPage.verifyProductInfomation(product);
  });
});

test('Verify adding multiple products to cart successfully', async ({ productPage, productDetailsPage, cartPage }) => {
  
  const product1 = products['blue.top'];
  const product2 = products['men.tshirt'];  

  await test.step('Add products to cart', async () => {
    await productPage.open();
    await productPage.addToCart(product1.name);
    await productPage.continueShopping();
    await productPage.viewProduct(product2.name);
    productDetailsPage.addToCart(product2.quantity);
  });

  await test.step('Verify products added to cart with correct information', async () => {
    await productDetailsPage.viewCart();
    await cartPage.verifyProductInfomation(product1);
    await cartPage.verifyProductInfomation(product2);
  });
});
