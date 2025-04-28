import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Products extends PageBase {
    searchField: Locator;
    searchButton: Locator;
    cardModal: Locator;
    viewCartBtn: Locator;
    continueShoppingBtn: Locator;
    productCards: Locator;
    categoryPanel: Locator;
    brandsPanel: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/products";
        this.title = "Automation Exercise - All Products";
        this.logo = "//div[contains(@class,'logo')]";

        this.searchField = page.locator("#search_product");
        this.searchButton = page.locator("#submit_search");
        this.cardModal = page.locator('#cartModal');
        this.viewCartBtn = page.locator(".modal-body >> text=View Cart");
        this.continueShoppingBtn = page.locator("button.close-modal");
        this.productCards = page.locator('.product-image-wrapper');
        this.categoryPanel = page.locator('#accordian');
        this.brandsPanel = page.locator('.brands-name');
    }

    /**
     * Get a product card by product name
     */
    async getProductCardByName(product: string) {
        const productCard = this.page.locator('.product-image-wrapper', {
            hasText: product,
        });
        await productCard.scrollIntoViewIfNeeded();
        await expect(productCard).toBeVisible();
        return productCard;
    }

    /**
     * Get a product card by index
     */
    async getProductCardByIndex(index: number) {
        const productCard = this.productCards.nth(index);
        await productCard.scrollIntoViewIfNeeded();
        await expect(productCard).toBeVisible();
        return productCard;
    }

    /**
     * Search for a product by name
     */
    async searchProduct(product: string) {
        await expect(this.searchField).toBeVisible();
        await this.searchField.fill(product);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    /**
     * Select a category to filter products
     */
    async selectCategory(category: string, subcategory?: string) {
        // Click the main category
        const categoryHeader = this.categoryPanel.locator('.panel-heading', {
            hasText: category
        });
        await expect(categoryHeader).toBeVisible();
        await categoryHeader.click();

        // If subcategory is provided, click on it
        if (subcategory) {
            const subcategoryLink = this.categoryPanel.locator(`#${category}`).locator('a', {
                hasText: subcategory
            });
            await expect(subcategoryLink).toBeVisible();
            await subcategoryLink.click();
        }
        
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    /**
     * Select a brand to filter products
     */
    async selectBrand(brand: string) {
        const brandLink = this.brandsPanel.locator('li a', {
            hasText: brand
        });
        await expect(brandLink).toBeVisible();
        await brandLink.click();
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    /**
     * Add a product to cart by name
     */
    async addToCart(product: string, quantity: number = 1) {
        const productCard = await this.getProductCardByName(product);
        await productCard.hover();

        const addToCartButton = productCard.locator('.productinfo >> .add-to-cart');
        await expect(addToCartButton).toBeVisible();
        for (let i = 0; i < quantity; i++) {
            console.log(`Adding ${quantity} of ${product} to cart...`);
            await addToCartButton.click();
            await this.continueShopping();
        }
        
        return this;
    }

    /**
     * Add a product to cart by index
     */
    async addToCartByIndex(index: number) {
        const productCard = await this.getProductCardByIndex(index);
        await productCard.hover();

        const addToCartButton = productCard.locator('.add-to-cart');
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();

        // Wait for the modal to appear
        await expect(this.cardModal).toBeVisible();
        return this;
    }

    /**
     * View product details
     */
    async viewProduct(product: string) {
        const productCard = await this.getProductCardByName(product);
        const viewProductButton = productCard.locator('.choose a', {
            hasText: 'View Product'
        });

        await expect(viewProductButton).toBeVisible();
        await viewProductButton.click();
        await this.page.waitForLoadState('networkidle');
        
        return this;
    }

    /**
     * View product details by index
     */
    async viewProductByIndex(index: number) {
        const productCard = await this.getProductCardByIndex(index);
        const viewProductButton = productCard.locator('.choose a', {
            hasText: 'View Product'
        });

        await expect(viewProductButton).toBeVisible();
        await viewProductButton.click();
        await this.page.waitForLoadState('networkidle');
        
        return this;
    }

    /**
     * Navigate to view cart after adding a product
     */
    async viewCart() {
        await expect(this.cardModal).toBeVisible();
        await this.viewCartBtn.click();
        await this.page.waitForLoadState('networkidle');
        return this;
    }

    /**
     * Continue shopping after adding a product
     */
    async continueShopping() {
        await expect(this.continueShoppingBtn).toBeVisible();
        await this.continueShoppingBtn.click();
        return this;
    }

    /**
     * Get the count of visible products
     */
    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    /**
     * Get product name by index
     */
    async getProductNameByIndex(index: number): Promise<string | null> {
        const productCard = await this.getProductCardByIndex(index);
        return await productCard.locator('.productinfo p').textContent();
    }

    /**
     * Get product price by index
     */
    async getProductPriceByIndex(index: number): Promise<string | null> {
        const productCard = await this.getProductCardByIndex(index);
        return await productCard.locator('.productinfo h2').textContent();
    }
}
