import { Locator, Page } from "@playwright/test";

export default class SignUpForm {
    readonly page: Page;
    readonly name: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly repeatPassword: Locator;
    readonly registerBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.name = page.locator("#signupName");
        this.lastName = page.locator("#signupLastName");
        this.email = page.locator("#signupEmail");
        this.password = page.locator("#signupPassword");
        this.repeatPassword = page.locator("#signupRepeatPassword");
        this.registerBtn = page.locator(".modal-content .btn-primary", { hasText: "Register" });
        this.errorMessage = page.locator(".invalid-feedback p");
    }

    async setName(name: string){
        await this.name.fill(name);
    }

    async setLastName(lastName: string){
        await this.lastName.fill(lastName);
    }

    async setEmail(email: string){
        await this.email.fill(email);
    }

    async setPassword(password: string){
        await this.password.fill(password);
    }

    async setRepeatPassword(password: string){
        await this.repeatPassword.fill(password);
    }

    async clickOnRegisterBtn(){
        await this.registerBtn.click();
    }

    async triggerError(field: Locator){
        field.focus();
        field.blur();
    }

    async clearField(field: Locator){
        await field.clear();
    }

    async setRegistrationData(name: string, lastName: string, email: string, password: string, repeatPassword: string){
        await this.name.fill(name);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.repeatPassword.fill(repeatPassword);
    }
}