import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class DashBoard extends PageBase {
    loggedLabel: Locator;
    searchInput: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/";
        this.title = "Automation Exercise";
        this.logo = "//div[contains(@class,'logo')]";

        this.loggedLabel = page.getByRole('link').filter({hasText: 'Logged in as'});
        this.searchInput = page.getByTestId("search-field");
    }

    async searchProduct(product: string) {
        this.searchInput.fill(product);
        await this.page.keyboard.press('Enter');
        return this;
    }

    async isLoggedIn() {
        return this.loggedLabel.isVisible();
    }
}
