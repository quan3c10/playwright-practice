import { DashBoard } from "../pages/DashBoard";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import {default as base} from '@playwright/test';

type PageManager = {
    dashBoardPage: DashBoard;
    cartPage: Cart;
    loginPage: Login;
    checkoutPage: Checkout;
    productPage: Products;
}

export const test = base.extend<PageManager>({
    dashBoardPage: async ({ page }, use) => {
        await use(new DashBoard(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new Cart(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new Login(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new Checkout(page));
    },
    productPage: async ({ page }, use) => {
        await use(new Products(page));
    }
});