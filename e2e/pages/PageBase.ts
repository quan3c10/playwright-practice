import { expect, Page } from "@playwright/test";
import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import fetch from "cross-fetch";

export class PageBase {
    private _url: string;
    private _title: string;
    private _logo: string;
    page: Page;

    public get logo(): string {
        return this._logo;
    }
    public set logo(value: string) {
        this._logo = value;
    }

    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    constructor(page: Page) {
        this.page = page;

        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        });
    }

    async open(path?: string) {
        const fullPath = path ? this.url + path : this.url;
        await this.page.goto(fullPath);
        return this;
    }

    async isOpened() {
        return await this.page.isVisible(this.logo) &&
            await this.page.title() === this.title;
    }

    async verifyTitleIs(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
}
