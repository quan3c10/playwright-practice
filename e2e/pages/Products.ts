import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Products extends PageBase {
    searchField: Locator;
    searchButton: Locator;
    cardModal: Locator;
    viewCardLink: Locator;
    continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/products";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo']";

        this.searchField = page.getByTestId("search_product");
        this.searchButton = page.getByTestId("submit_search");
        this.cardModal = page.getByTestId("cartModal");
        this.viewCardLink = page.locator("//u[text()='View Cart']");
        this.continueShoppingButton = page.locator(
            "//button[text()='Continue Shopping']",
        );
    }

    async searchProduct(product: string) {
        await this.searchField.fill( product);
        await this.searchButton.click();
        return this;
    }

    async selectCategory(category: string) {
        await this.page.click(
            `//div[contains(@class,'category-products')]//a[contains(@href,'${category}')]`,
        );
        return this;
    }

    async selectBrand(brand: string) {
        await this.page.click(
            `//div[@class='brands_products']//a[text()='${brand}']`,
        );
        return this;
    }

    async hoverToProduct(product: string) {
        await this.page.click(
            `//p[text()='${product}']//ancestor::div[contains(@class,'productinfo')]`,
        );
        return this;
    }

    async addToCart(product: string) {
        this.hoverToProduct(product);
        await this.page.click(
            `//p[text()='${product}']//ancestor::div[contains(@class,'product-overlay')]//a`,
        );
        return this;
    }

    async viewProduct(product: string) {
        await this.page.click(
            `//p[text()='${product}']//ancestor::div[contains(@class,'product-image-wrapper')]//a[text()='View Product']`,
        );
        return this;
    }

    async cartModalIsVisible() {
        return await this.cardModal.isVisible();
    }

    async viewCart() {
        if (await this.cartModalIsVisible()) {
            this.viewCardLink.click();
            return this;
        } else {
            throw new Error("Card modal is not visible");
        }
    }

    async continueShopping() {
        if (await this.cartModalIsVisible()) {
            this.continueShoppingButton.click();
            return this;
        } else {
            throw new Error("Card modal is not visible");
        }
    }
}
