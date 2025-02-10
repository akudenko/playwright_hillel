import { expect, Locator, Page } from "@playwright/test";

export default class GaragePage {
    readonly page: Page;
    readonly title: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = page.locator(".h3");
    }

    async open(){
        await this.page.goto('/panel/garage');
    }

    async getTitle(){
        return this.title;
    }
}