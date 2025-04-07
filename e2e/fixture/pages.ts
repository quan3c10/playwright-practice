import { Cart } from "../pages/Cart";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import { ProductDetails } from "../pages/ProductDetails";
import {default as base} from '@playwright/test';

type PageManager = {
    cartPage: Cart;
    loginPage: Login;
    productPage: Products;
    productDetailsPage: ProductDetails;
}

export const test = base.extend<PageManager>({
    cartPage: async ({ page }, use) => {
        await use(new Cart(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new Login(page));
    },
    productPage: async ({ page }, use) => {
        await use(new Products(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetails(page));
    }
});

export const beforeEach = test.beforeEach;
export const beforeAll = test.beforeAll;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;
export const use = test.use;
export const step = test.step;