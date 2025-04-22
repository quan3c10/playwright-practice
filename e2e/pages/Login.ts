import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class Login extends PageBase {
    private _defaultUsername = "quanuh@gmail.com";
    private _defaultPassword = "12345678";
    usernameTxt: Locator;
    passwordTxt: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.url = "/login";
        this.title = "Automation Exercise - Signup / Login";
        this.logo = "//div[contains(@class,'logo')]";

        this.usernameTxt = this.page.locator("//input[@data-qa='login-email']");
        this.passwordTxt = this.page.locator("//input[@name='password']");
        this.loginButton = this.page.locator("//button[@data-qa='login-button']");
    }

    async loginWith(username: string, password: string) {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginButton.click();
        return this;
    }

    async loginWithDefaultCredentials() {
        

        await this.usernameTxt.fill(this._defaultUsername);
        await this.passwordTxt.fill(this._defaultPassword);
        await this.loginButton.click();
        return this;
    }
}
