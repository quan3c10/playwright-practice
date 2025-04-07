import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Products extends PageBase {
    searchField: Locator;
    searchButton: Locator;
    cardModal: Locator;
    viewCartBtn: Locator;
    continueShoppingBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/products";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo']";

        this.searchField = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
        this.cardModal = page.locator('#cartModal');
        this.viewCartBtn = page.locator(".modal-body >> text=View Cart");
        this.continueShoppingBtn = page.locator(
            "//button[text()='Continue Shopping']",
        );
    }

    async getProductCardByName(product: string) {

        const productCard = this.page.locator('.product-image-wrapper', {
            hasText: product,
        });
        await productCard.scrollIntoViewIfNeeded();
        await expect(productCard).toBeVisible();
        return productCard;
    }

    async searchProduct(product: string) {

        // 2. Fill in search box and click the search button
        await this.searchField.fill(product);
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

    async addToCart(product: string) {

        const productCard = await this.getProductCardByName(product);
        await productCard.hover();

        const addToCartButton = productCard.locator('.product-overlay .add-to-cart');
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        return this;
    }

    async viewProduct(product: string) {
        const productCard = await this.getProductCardByName(product);

        const viewProductButton = productCard.locator('//a',{hasText: 'View Product'});

        await expect(viewProductButton).toBeVisible();
        await viewProductButton.click();
        
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
        await expect(this.continueShoppingBtn).toBeVisible();
        await this.continueShoppingBtn.click();
        return this;
    }
}
