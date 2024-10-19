import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class DashBoard extends PageBase {

    private _loggedLabel: Locator;
    private _searchInput: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/";
        this.title = "Automation Exercise";
        this.logo = "//div[contains(@class,'logo')]";

        this._loggedLabel = page.getByRole('link').filter({hasText: 'Logged in as'});
        this._searchInput = page.locator("//input[@id='search-field']");
    }

    async searchProduct(product: string) {
        this._searchInput.fill(product);
        await this.page.keyboard.press('Enter');
        return this;
    }

    async isLoggedIn() {
        return this._loggedLabel.isVisible();
    }
}
