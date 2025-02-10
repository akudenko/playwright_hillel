import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly signInBtn: Locator;
    readonly registrationBtn: Locator;
    readonly fields: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInBtn = page.locator("button.header_signin");
        this.registrationBtn = page.locator(".modal-content .btn-link", { hasText: "Registration" });
    }

    async open(){
        await this.page.goto('/');
    }

    async openSignInForm(){
        this.signInBtn.click();
    }

}