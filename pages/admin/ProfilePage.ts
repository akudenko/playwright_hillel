import { Locator, Page } from "@playwright/test";

export default class ProfilePage {
    readonly page: Page;
    readonly fullName: Locator;

    constructor(page: Page){
        this.page = page;
        this.fullName = page.locator(".display-4");
    }

    async open(){
        await this.page.goto('/panel/profile');
    }

    async getFullName(){
        return this.fullName;
    }

}