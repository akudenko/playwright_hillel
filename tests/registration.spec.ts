import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.describe("Sign Up - positive flow", () => {
  const user = {
    name: "Oleksii",
    lastName: "Kud",
    email: `aqa-phpcarieer${Date.now()}@gmail.com`,
    password: "1234567Aa_",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("button.header_signin").click();
    await page
      .locator(".modal-content .btn-link", { hasText: "Registration" })
      .click();
  });

  test("User is able to register an account", async ({ page }) => {
    await page.locator("#signupName").fill(user.name);
    await page.locator("#signupLastName").fill(user.lastName);
    await page.locator("#signupEmail").fill(user.email);
    await page.locator("#signupPassword").fill(user.password);
    await page.locator("#signupRepeatPassword").fill(user.password);
    await page
      .locator(".modal-content .btn-primary", { hasText: "Register" })
      .click();

    await expect(page.locator(".h3")).toHaveText(
      `You don’t have any cars in your garage`
    );
    await page.goto("/panel/profile");
    await expect(page.locator(".display-4")).toHaveText(
      `${user.name} ${user.lastName}`
    );
  });
});

test.describe("Sign Up - negative flows", () => {
  const user = {
    name: "Oleksii",
    lastName: "Kud",
    email: `phpcarieer${Date.now()}@gmail.com`,
    password: "1234567Aa_",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("button.header_signin").click();
    await page
      .locator(".modal-content .btn-link", { hasText: "Registration" })
      .click();
  });

  test("Validation by required fields", async ({ page }) => {
    const validationMessages = [
      "Name required",
      "Last name required",
      "Email required",
      "Password required",
      "Re-enter password required",
    ];

    await page.locator("#signupName").focus();
    await page.locator("#signupName").blur();
    await page.locator("#signupLastName").focus();
    await page.locator("#signupLastName").blur();
    await page.locator("#signupEmail").focus();
    await page.locator("#signupEmail").blur();
    await page.locator("#signupPassword").focus();
    await page.locator("#signupPassword").blur();
    await page.locator("#signupRepeatPassword").focus();
    await page.locator("#signupRepeatPassword").blur();

    await expect(page.locator(".invalid-feedback p")).toHaveCount(5);
    await expect(page.locator(".invalid-feedback p")).toHaveCount(5);
    await expect(
      page.locator(".modal-content .btn-primary", { hasText: "Register" })
    ).toBeDisabled();

    for (let i = 0; i < validationMessages.length; i++) {
      await expect(page.locator(".invalid-feedback p").nth(i)).toHaveText(
        validationMessages[i]
      );
      await expect(page.locator(".invalid-feedback p").nth(i)).toHaveCSS(
        "color",
        "rgb(220, 53, 69)"
      );
    }

    for (let i = 0; i < 5; i++) {
      await expect(page.locator("form input").nth(i)).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    }
  });

  test("Validation by wrong data", async ({ page }) => {
    const validationMessages = [
      "Name is invalid",
      "Last name is invalid",
      "Email is incorrect",
      "Passwords do not match",
    ];

    await page.locator("#signupName").fill("123");
    await page.locator("#signupLastName").fill("123");
    await page.locator("#signupEmail").fill("okudenko");
    await page.locator("#signupEmail").focus();
    await page.locator("#signupEmail").blur();
    await page.locator("#signupPassword").fill(user.password);
    await page.locator("#signupRepeatPassword").fill(`${user.password}1234`);
    await page.locator("#signupRepeatPassword").focus();
    await page.locator("#signupRepeatPassword").blur();

    await expect(page.locator(".invalid-feedback p")).toHaveCount(4);
    await expect(
      page.locator(".modal-content .btn-primary", { hasText: "Register" })
    ).toBeDisabled();

    for (let i = 0; i < validationMessages.length; i++) {
      await expect(page.locator(".invalid-feedback p").nth(i)).toHaveText(
        validationMessages[i]
      );
    }
  });

  test("Validation by wrong length", async ({ page }) => {
    const validationMessages = [
      "Name has to be from 2 to 20 characters long",
      "Last name has to be from 2 to 20 characters long",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    ];

    await page.locator("#signupName").fill("a");
    await page.locator("#signupLastName").fill("K");
    await page.locator("#signupPassword").fill("123");
    await page.locator("#signupRepeatPassword").fill("123");
    await page.locator("#signupRepeatPassword").blur();

    for (let i = 0; i < validationMessages.length; i++) {
      await expect(page.locator(".invalid-feedback p").nth(i)).toHaveText(
        validationMessages[i]
      );
    }

    await expect(
        page.locator(".modal-content .btn-primary", { hasText: "Register" })
      ).toBeDisabled();

    await page.locator("#signupName").fill("Oleksiiiiiiiiiiiiiiii");
    await page.locator("#signupLastName").fill("Kudenkooooooooooooooooooooo");
    await page.locator("#signupPassword").fill("123456789101112131415");
    await page
      .locator("#signupRepeatPassword")
      .fill("112345678910111213141523");
    await page.locator("#signupRepeatPassword").blur();

    for (let i = 0; i < validationMessages.length; i++) {
      await expect(page.locator(".invalid-feedback p").nth(i)).toHaveText(
        validationMessages[i]
      );
    }

    await expect(
        page.locator(".modal-content .btn-primary", { hasText: "Register" })
      ).toBeDisabled();
  });
});
