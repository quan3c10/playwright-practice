import { Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class DashBoard extends PageBase {

    private _loggedUser = "//a[contains(text(),'Logged in as')]";

    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/";
        this.title = "Automation Exercise";
        this.logo = "//div[contains(@class,'logo')]";
    }

    async searchProduct(product: string) {
        await this.page.fill("//input[@id='search-field']", product);
        await this.page.keyboard.press('Enter');
        return this;
    }

    async isLoggedIn() {
        return this.page.isVisible(this._loggedUser);
    }
}
