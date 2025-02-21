import { test, expect } from "@playwright/test";
import HomePage from "../../pages/HomePage";
import GaragePage from "../../pages/admin/GaragePage";
import ProfilePage from "../../pages/admin/ProfilePage";
import SignInForm from "../../pages/forms/SignInForm";


test.describe("Save session storage", () => {
  let homePage: HomePage;
  let garagePage: GaragePage;
  let signInForm: SignInForm;


  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    garagePage = new GaragePage(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
  });


  test("Do login and save a storage state", async ({ page }) => {
    await signInForm.loginWithCredentials(process.env.ADMIN_USER_EMAIL ?? '', process.env.ADMIN_USER_PASSWORD ?? '');
    await expect(await garagePage.getTitle()).toHaveText(
      `Garage`
    );
    await page.context().storageState({ path: 'test-data/states/adminUserState.json'});
  });
});