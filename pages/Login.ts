import { Page } from "@playwright/test";
import { PageBase } from "./PageBase";

export class DashBoard extends PageBase {

    private _usernameField = "//input[@name='email']";
    private _passwordField = "//input[@name='password']";
    private _loginButton = "//button[@data-qa='login-button']";
    private _defaultUsername = "sqakfs@gamil.com";
    private _defaultPassword = "1111";


    constructor(page: Page) {
        super(page);

        this.url = "https://automationexercise.com/login";
        this.title = "Automation Exercise - Signup / Login";
        this.logo = "//div[contains(@class,'logo')]";
    }

    async loginWith(username: string, password: string) {
        await this.page.fill(this._usernameField, username);
        await this.page.fill(this._passwordField, password);
        await this.page.click(this._loginButton);
        return this;
    }

    async loginWithDefaultCredentials() {
        await this.page.fill(this._usernameField, this._defaultUsername);
        await this.page.fill(this._passwordField, this._defaultPassword);
        await this.page.click(this._loginButton);
        return this;
    }
}
