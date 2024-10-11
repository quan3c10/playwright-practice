import { DashBoard } from "./DashBoard";
import { PageBase } from "./PageBase";

export class PageManager {

    private _loginPage: PageBase;
    public get loginPage(): PageBase {
        return this._loginPage;
    }
    public set loginPage(value: PageBase) {
        this._loginPage = value;
    }
    private _dashBoardPage: PageBase;
    public get dashBoardPage(): PageBase {
        return this._dashBoardPage;
    }
    public set dashBoardPage(value: PageBase) {
        this._dashBoardPage = value;
    }

    constructor(page, request) {
        this._dashBoardPage = new DashBoard(page);
     }
}