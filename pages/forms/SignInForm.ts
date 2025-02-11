import { Page, Locator } from "@playwright/test";


export default class SignInForm {
    readonly page: Page;
    readonly loginBtn: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly registrationBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginBtn = page.locator(".modal-content .btn-primary", { hasText: "Login" });
        this.email = page.locator("#signinEmail");
        this.password = page.locator("#signinPassword");
        this.registrationBtn = page.locator(".modal-content .btn-link", { hasText: "Registration" });
    }

    async openRegistrationForm(){
        await this.registrationBtn.click();
    }

    async loginWithCredentials(email: string, password: string){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}