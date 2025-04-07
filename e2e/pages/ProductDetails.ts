import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class ProductDetails extends PageBase {
    productQuantityInput: Locator;
    addToCardBtn: Locator;
    cardModal: Locator;
    viewCartBtn: Locator;
    continueShoppingBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/product_details";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo']";

        this.productQuantityInput = page.locator("#quantity");
        this.addToCardBtn = page.locator(".product-information").locator("//button");
        this.cardModal = page.locator('#cartModal');
        this.viewCartBtn = page.locator(".modal-body >> text=View Cart");
        this.continueShoppingBtn = page.locator(
            "//button[text()='Continue Shopping']",
        );
    }

    async productDetailsWithID(id: string) {
        await this.open(`/${id}`);
        return this;
    }

    async addToCart(quantity: number) {

        await expect(this.productQuantityInput).toBeVisible();
        await this.productQuantityInput.fill(quantity.toString());

        await expect(this.addToCardBtn).toBeVisible();
        await this.addToCardBtn.click();

        return this;
    }

    async cartModalIsVisible() {
        return await this.cardModal.isVisible();
    }

    async viewCart() {
        await expect(this.cardModal).toBeVisible();

        await this.viewCartBtn.click();
        return this;
    }

    async continueShopping() {
        expect(this.continueShoppingBtn).toBeVisible();
        this.continueShoppingBtn.click();
        return this;
    }
}
