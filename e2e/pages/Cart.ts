import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";
import { Product } from "../data/types";

export class Cart extends PageBase {
    checkoutButton: Locator;
    cartEmpty: Locator;
    cartList: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/view_cart";
        this.title = "Automation Exercise - Checkout";
        this.logo = "//div[contains(@class,'logo')]";
        this.cartEmpty = page.getByTestId("#empty_cart");
        this.cartList = page.locator("#cart_list");
        this.checkoutButton = page.locator(
            "#cart_items",
            { hasText: "Proceed To Checkout" }
        );
    }

    async checkout() {
        await this.checkoutButton.click();
        return this;
    }

    async cartIsEmpty() {
        return await this.cartEmpty.isVisible();
    }

    async getProductCategoryByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const category = await this.page.textContent(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_description"]/p`
            );
            if (category) {
                return category;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getPriceByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const price = await this.page.textContent(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_price"]/p`
            );
            if (price) {
                return price;
            } else throw new Error("Product price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getQuantityByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const quantity = await this.page.textContent(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_quantity"]/button`
            );
            if (quantity) {
                return quantity;
            } else throw new Error("Product quantity blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getTotalPriceByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const totalPrice = await this.page.textContent(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_total"]/p`
            );
            if (totalPrice) {
                return totalPrice;
            } else throw new Error("Product total price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async deleteItemByName(product: string) {
        if (!await this.cartIsEmpty()) {
            await this.page.click(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_delete"]/a`,
            );
            return this;
        } else throw new Error("Cart is empty");
    }

    async getProductNameById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const name = await this.page.textContent(
                `//tr[@id="product-${productId}"]//td[@class="cart_description"]//a`
            );
            if (name) {
                return name;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getProductCategoryById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const category = await this.page.textContent(
                `//tr[@id="product-${productId}"]//td[@class="cart_description"]/p`
            );
            if (category) {
                return category;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getPriceById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const price = await this.page.textContent(
                `//tr[@id="product-${productId}"]//td[@class="cart_price"]/p`
            );
            if (price) {
                return price;
            } else throw new Error("Product price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getQuantityById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const quantity = await this.page.textContent(
                `//tr[@id="product-${productId}"]//td[@class="cart_quantity"]/button`
            );
            if (quantity) {
                return quantity;
            } else throw new Error("Product quantity blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getTotalPriceById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const totalPrice = await this.page.textContent(
                `//tr[@id="product-${productId}"]//td[@class="cart_total"]/p`
            );
            if (totalPrice) {
                return totalPrice;
            } else throw new Error("Product total price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async deleteItemById(productId: string) {
        if (!await this.cartIsEmpty()) {
            await this.page.click(
                `//tr[@id="product-${productId}"]//td[@class="cart_delete"]/a`,
            );
            return this;
        } else throw new Error("Cart is empty");
    }

    async verifyProductInfomation(product: Product) {
        expect(await this.getProductCategoryByName(product.name)).toEqual(product.category);
        expect(await this.getPriceByName(product.name)).toEqual(`Rs. ${product.price}`);
        expect(await this.getQuantityByName(product.name)).toEqual(`${product.quantity}`);
        expect(await this.getTotalPriceByName(product.name)).toEqual(`Rs. ${product.price * product.quantity}`);
    }
}
