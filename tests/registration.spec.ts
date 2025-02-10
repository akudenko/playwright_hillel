import { test, expect } from "@playwright/test";
import { describe } from "node:test";
import HomePage from "../pages/HomePage";
import SignUpForm from "../pages/forms/SignUpForm";
import SignInForm from "../pages/forms/SignInForm";
import GaragePage from "../pages/admin/GaragePage";
import ProfilePage from "../pages/admin/ProfilePage";

test.describe("Sign Up - positive flow", () => {
  let homePage: HomePage;
  let garagePage: GaragePage;
  let profilePage: ProfilePage;
  let signUpForm: SignUpForm;
  let signInForm: SignInForm;


  const user = {
    name: "Oleksii",
    lastName: "Kud",
    email: `aqa-phpcarieer${Date.now()}@gmail.com`,
    password: "1234567Aa_",
  };

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    profilePage = new ProfilePage(page);
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
    await signInForm.openRegistrationForm();
  });


  test("User is able to register an account", async ({ page }) => {
    await signUpForm.setRegistrationData(user.name, user.lastName, user.email, user.password, user.password);
    await signUpForm.clickOnRegisterBtn();

    await expect(await garagePage.getTitle()).toHaveText(
      `You don’t have any cars in your garage`
    );

    await profilePage.open();

    await expect(await profilePage.getFullName()).toHaveText(
      `${user.name} ${user.lastName}`
    );
  });
});

test.describe("Sign Up - negative flows", () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  let signInForm: SignInForm;

  const user = {
    name: "Oleksii",
    lastName: "Kud",
    email: `phpcarieer${Date.now()}@gmail.com`,
    password: "1234567Aa_",
  };

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
    await signInForm.openRegistrationForm();
  });

  test("Name field should be required", async ({ page }) => {
    await signUpForm.triggerError(signUpForm.name);
    await expect(signUpForm.errorMessage).toHaveText(
      "Name required"
    );

    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );

    await expect(signUpForm.name).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field should display validation by wrong data", async ({
    page,
  }) => {
    await signUpForm.setName('123');
    await signUpForm.triggerError(signUpForm.name);
    await expect(signUpForm.errorMessage).toHaveText(
      "Name is invalid"
    );

    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );

    await expect(signUpForm.name).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Name field should display validation by wrong length", async ({
    page,
  }) => {
    await signUpForm.setName("a");
    await signUpForm.triggerError(signUpForm.name);
    await expect(signUpForm.errorMessage).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );

    await signUpForm.clearField(signUpForm.name);
    await signUpForm.setName("Oleksiiiiiiiiiiiiiiiisdsdsdsdsdsdsdsd");
    await signUpForm.triggerError(signUpForm.name);

    await expect(signUpForm.errorMessage).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.name).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should be required", async ({ page }) => {
    await signUpForm.triggerError(signUpForm.lastName);
    await expect(signUpForm.errorMessage).toHaveText(
      "Last name required"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.lastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should display validation by wrong data", async ({
    page,
  }) => {
    await signUpForm.setLastName("123");
    await signUpForm.triggerError(signUpForm.lastName);
    await expect(signUpForm.errorMessage).toHaveText(
      "Last name is invalid"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.lastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("LastName field should display validation by wrong length", async ({
    page,
  }) => {
    await signUpForm.setLastName("K");
    await signUpForm.triggerError(signUpForm.lastName);

    await expect(signUpForm.errorMessage).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );

    await signUpForm.clearField(signUpForm.lastName);
    await signUpForm.setLastName("Kudenkooooooooooooooooooooooooooooo");
    await signUpForm.triggerError(signUpForm.lastName);

    await expect(signUpForm.errorMessage).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.lastName).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email field should be required", async ({ page }) => {
    await signUpForm.triggerError(signUpForm.email);

    await expect(signUpForm.errorMessage).toHaveText(
      "Email required"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.email).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Email field should display validation by wrong data", async ({
    page,
  }) => {
    await signUpForm.setEmail("okudenko");
    await signUpForm.triggerError(signUpForm.email);
    await expect(signUpForm.errorMessage).toHaveText(
      "Email is incorrect"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.email).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field should be required", async ({ page }) => {
    await signUpForm.triggerError(signUpForm.password);

    await expect(signUpForm.errorMessage).toHaveText(
      "Password required"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.password).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Password field should display validation by wrong data", async ({
    page,
  }) => {
    await signUpForm.setPassword("1234567");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await signUpForm.clearField(signUpForm.password);
    await signUpForm.setPassword("123456789101112131415");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await signUpForm.clearField(signUpForm.password);
    await signUpForm.setPassword("12345678");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await signUpForm.clearField(signUpForm.password);
    await signUpForm.setPassword("12345678A");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await signUpForm.clearField(signUpForm.password);
    await signUpForm.setPassword("12345678a");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await signUpForm.clearField(signUpForm.password);
    await signUpForm.setPassword("12345678!");
    await signUpForm.triggerError(signUpForm.password);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.password).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("RepeatPassword field should be required", async ({ page }) => {
    await signUpForm.triggerError(signUpForm.repeatPassword);

    await expect(signUpForm.errorMessage).toHaveText(
      "Re-enter password required"
    );
    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.repeatPassword).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("RepeatPassword field should display validation by wrong data", async ({
    page,
  }) => {
    await signUpForm.setPassword("1234567Aa_");
    await signUpForm.setRepeatPassword("1234567A");
    await signUpForm.triggerError(signUpForm.repeatPassword);
    await expect(signUpForm.errorMessage).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    await expect(signUpForm.errorMessage).toHaveCSS(
      "color",
      "rgb(220, 53, 69)"
    );
    await expect(signUpForm.repeatPassword).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  test("Register button should be disabled if any required field has an error", async ({
    page,
  }) => {
    await signUpForm.setName("123");
    await signUpForm.setLastName("123");
    await signUpForm.setEmail("okudenko");
    await signUpForm.triggerError(signUpForm.email);
    await signUpForm.setPassword(user.password);
    await signUpForm.setRepeatPassword(`${user.password}1234`);
    await signUpForm.triggerError(signUpForm.repeatPassword);

    await expect(signUpForm.registerBtn).toBeDisabled();
  });
});
