import { Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Cart extends PageBase {
    private _checkoutButton = "//a[contains(@class,'check_out')]";
    private _cartEmpty = "//span[@id='empty_cart']";

    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/view_cart";
        this.title = "Automation Exercise - Checkout";
        this.logo = "//div[contains(@class,'logo')]";
    }

    async checkout() {
        await this.page.click(this._checkoutButton);
        return this;
    }

    async cartIsEmpty() {
        return await this.page.isVisible(this._cartEmpty);
    }

    async getProductCategoryByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const category = await this.page.getAttribute(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_description"]/p`,
                "text",
            );
            if (category) {
                return category;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getPriceByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const price = await this.page.getAttribute(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_price"]/p`,
                "text",
            );
            if (price) {
                return price;
            } else throw new Error("Product price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getQuantityByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const quantity = await this.page.getAttribute(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_quantity"]/button`,
                "text",
            );
            if (quantity) {
                return quantity;
            } else throw new Error("Product quantity blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getTotalPriceByName(product: string) {
        if (!await this.cartIsEmpty()) {
            const totalPrice = await this.page.getAttribute(
                `//a[text()='${product}']//ancestor::tr//td[@class="cart_total"]/p`,
                "text",
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
            const name = await this.page.getAttribute(
                `//tr[@id="product-${productId}"]//td[@class="cart_description"]//a`,
                "text",
            );
            if (name) {
                return name;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getProductCategoryById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const category = await this.page.getAttribute(
                `//tr[@id="product-${productId}"]//td[@class="cart_description"]/p`,
                "text",
            );
            if (category) {
                return category;
            } else throw new Error("Product category blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getPriceById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const price = await this.page.getAttribute(
                `//tr[@id="product-${productId}"]//td[@class="cart_price"]/p`,
                "text",
            );
            if (price) {
                return price;
            } else throw new Error("Product price blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getQuantityById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const quantity = await this.page.getAttribute(
                `//tr[@id="product-${productId}"]//td[@class="cart_quantity"]/button`,
                "text",
            );
            if (quantity) {
                return quantity;
            } else throw new Error("Product quantity blank or not found");
        } else throw new Error("Cart is empty");
    }

    async getTotalPriceById(productId: string) {
        if (!await this.cartIsEmpty()) {
            const totalPrice = await this.page.getAttribute(
                `//tr[@id="product-${productId}"]//td[@class="cart_total"]/p`,
                "text",
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
}
