import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";
import { CartProduct } from "../models/ui/CheckoutModels";
import { Product } from "../models/ui/ProductModels";

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
        this.cartList = page.locator("#cart_info_table");
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

    async getCartQuantity() {
        await this.page.goto(this.url);
        if (!await this.cartIsEmpty()) {
            return await this.page.locator("//tbody/tr").count();
        } else return 0;
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
    /**
        * Get product information by product ID
        * @param name The ID of the product
        * @returns CheckoutProduct object with product details
        */
    async getProductByName(productName: string): Promise<CartProduct> {
        const productRow = this.page.locator(`//a[contains(text(),"${productName}")]//ancestor::tr`);

        if (await productRow.count() === 0) {
            console.log(`Product with name "${productName}" not found in the checkout.`);
        }

        await expect(productRow).toBeVisible();

        const id = (await productRow.getAttribute("id") || "").replace("product-", "");
        const name = await productRow.locator(".cart_description h4 a").textContent() || "";
        const category = await productRow.locator(".cart_description p").textContent() || "";
        const price = (await productRow.locator(".cart_price p").textContent())?.split(" ")[1] || "";
        const quantity = await productRow.locator(".cart_quantity button").textContent() || "";
        const total = await productRow.locator(".cart_total p").textContent() || "";

        return {
            id: Number(id),
            name,
            category,
            price: Number(price),
            quantity: Number(quantity),
            availability: "",
            condition: "",
            brand: "",
            total
        };
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

    async verifyProductInfo(product: Product) {
        const productInfo = await this.getProductByName(product.name);

        await expect(productInfo.name).toEqual(product.name);
        await expect(productInfo.category).toEqual(product.category);
        await expect(productInfo.price).toEqual(product.price);
        await expect(productInfo.quantity).toEqual(product.quantity);
        await expect(productInfo.total).toEqual(`Rs. ${product.price * product.quantity}`);

        return this;
    }
}
