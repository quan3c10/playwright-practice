import { Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Products extends PageBase {

    private _searchField = "//button[@id='search_product']";
    private _searchButton = "//button[@id='submit_search']";
    private _cardModal = "//div[@id='cartModal']";
    private _viewCardLink = "//u[text()='View Cart']";
    private _continueShoppingButton = "//button[text()='Continue Shopping']"
    
    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/products";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo']";
    }

    async searchProduct(product: string) {
        await this.page.fill(this._searchField, product);
        await this.page.click(this._searchButton);
        return this;
    }

    async selectCategory(category: string) {
        await this.page.click(`//div[contains(@class,'category-products')]//a[contains(@href,'${category}')]`);
        return this;
    }

    async selectBrand(brand: string) {
        await this.page.click(`//div[@class='brands_products']//a[text()='${brand}']`);
        return this;
    }

    async hoverToProduct(product: string) {
        await this.page.click(`//p[text()='${product}']//ancestor::div[contains(@class,'productinfo')]`);
        return this;
    }

    async addToCart(product: string) {
        this.hoverToProduct(product);
        await this.page.click(`//p[text()='${product}']//ancestor::div[contains(@class,'product-overlay')]//a`);
        return this;
    }

    async viewProduct(product: string) {
        await this.page.click(`//p[text()='${product}']//ancestor::div[contains(@class,'product-image-wrapper')]//a[text()='View Product']`);
        return this;
    }

    async cartModalIsVisible() {
        return await this.page.isVisible(this._cardModal);
    }

    async viewCart() {
        if (await this.cartModalIsVisible()) {
            this.page.click(this._viewCardLink);
            return this;
        }else{
            throw new Error('Card modal is not visible');
        }
    }

    async continueShopping() {
        if (await this.cartModalIsVisible()) {
            this.page.click(this._continueShoppingButton);
            return this;
        }else{
            throw new Error('Card modal is not visible');
        }
    }
}
