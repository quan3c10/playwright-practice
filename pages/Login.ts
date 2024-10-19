import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class DashBoard extends PageBase {
    private _usernameField: Locator;
    private _passwordField: Locator;
    private _loginButton: Locator;
    private _defaultUsername = "sqakfs@gamil.com";
    private _defaultPassword = "1111";

    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/login";
        this.title = "Automation Exercise - Signup / Login";
        this.logo = "//div[contains(@class,'logo')]";

        this._usernameField = page.locator("//input[@name='email']");
        this._passwordField = page.locator("//input[@name='password']");
        this._loginButton = page.locator("//button[@data-qa='login-button']");
    }

    async loginWith(username: string, password: string) {
        await this._usernameField.fill(username);
        await this._passwordField.fill(password);
        await this._loginButton.click();
        return this;
    }

    async loginWithDefaultCredentials() {
        await this._usernameField.fill(this._defaultUsername);
        await this._passwordField.fill(this._defaultPassword);
        await this._loginButton.click();
        return this;
    }
}
