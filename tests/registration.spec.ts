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

  test("Name field should be required", async ({ page }) => {
    await page.locator("#signupName").focus();
    await page.locator("#signupName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Name required"
    );

    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );

    await expect(page.locator("#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field should display validation by wrong data", async ({
    page,
  }) => {
    await page.locator("#signupName").fill("123");
    await page.locator("#signupName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Name is invalid"
    );

    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );

    await expect(page.locator("#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field should display validation by wrong length", async ({
    page,
  }) => {
    await page.locator("#signupName").fill("a");
    await page.locator("#signupName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );

    await page.locator("#signupName").clear();
    await page
      .locator("#signupName")
      .fill("Oleksiiiiiiiiiiiiiiiisdsdsdsdsdsdsdsd");
    await page.locator("#signupName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should be required", async ({ page }) => {
    await page.locator("#signupLastName").focus();
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Last name required"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should display validation by wrong data", async ({
    page,
  }) => {
    await page.locator("#signupLastName").fill("123");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Last name is invalid"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should display validation by wrong length", async ({
    page,
  }) => {
    await page.locator("#signupLastName").fill("K");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );

    await page.locator("#signupLastName").clear();
    await page
      .locator("#signupLastName")
      .fill("Kudenkooooooooooooooooooooooooooooo");
    await page.locator("#signupLastName").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupLastName")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email field should be required", async ({ page }) => {
    await page.locator("#signupEmail").focus();
    await page.locator("#signupEmail").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Email required"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupEmail")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email field should display validation by wrong data", async ({
    page,
  }) => {
    await page.locator("#signupEmail").fill("okudenko");
    await page.locator("#signupEmail").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Email is incorrect"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupEmail")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field should be required", async ({ page }) => {
    await page.locator("#signupPassword").focus();
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password required"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field should display validation by wrong data", async ({
    page,
  }) => {
    await page.locator("#signupPassword").fill("1234567");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill("123456789101112131415");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill("12345678");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill("12345678A");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill("12345678a");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await page.locator("#signupPassword").clear();
    await page.locator("#signupPassword").fill("12345678!");
    await page.locator("#signupPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("RepeatPassword field should be required", async ({ page }) => {
    await page.locator("#signupRepeatPassword").focus();
    await page.locator("#signupRepeatPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Re-enter password required"
    );
    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("RepeatPassword field should display validation by wrong data", async ({
    page,
  }) => {
    await page.locator("#signupPassword").fill("1234567Aa_");

    await page.locator("#signupRepeatPassword").fill("1234567A");
    await page.locator("#signupRepeatPassword").blur();
    await expect(page.locator(".invalid-feedback p")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(page.locator(".invalid-feedback p")).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Register button should be disabled if any required field has an error", async ({
    page,
  }) => {
    await page.locator("#signupName").fill("123");
    await page.locator("#signupLastName").fill("123");
    await page.locator("#signupEmail").fill("okudenko");
    await page.locator("#signupEmail").focus();
    await page.locator("#signupEmail").blur();
    await page.locator("#signupPassword").fill(user.password);
    await page.locator("#signupRepeatPassword").fill(`${user.password}1234`);
    await page.locator("#signupRepeatPassword").focus();
    await page.locator("#signupRepeatPassword").blur();

    await expect(
      page.locator(".modal-content .btn-primary", { hasText: "Register" })
    ).toBeDisabled();
  });
});
