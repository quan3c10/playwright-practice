import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Products extends PageBase {
    private _searchField: Locator;
    private _searchButton: Locator;
    private _cardModal: Locator;
    private _viewCardLink: Locator;
    private _continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/products";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo']";

        this._searchField = page.locator("//button[@id='search_product']");
        this._searchButton = page.locator("//button[@id='submit_search']");
        this._cardModal = page.locator("//div[@id='cartModal']");
        this._viewCardLink = page.locator("//u[text()='View Cart']");
        this._continueShoppingButton = page.locator(
            "//button[text()='Continue Shopping']",
        );
    }

    async searchProduct(product: string) {
        await this._searchField.fill( product);
        await this._searchButton.click();
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
        return await this._cardModal.isVisible();
    }

    async viewCart() {
        if (await this.cartModalIsVisible()) {
            this._viewCardLink.click();
            return this;
        } else {
            throw new Error("Card modal is not visible");
        }
    }

    async continueShopping() {
        if (await this.cartModalIsVisible()) {
            this._continueShoppingButton.click();
            return this;
        } else {
            throw new Error("Card modal is not visible");
        }
    }
}
