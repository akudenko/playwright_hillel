import { test, expect } from "@playwright/test";
import HomePage from "../../pages/HomePage";
import SignInForm from "../../pages/forms/SignInForm";
import ProfilePage from "../../pages/admin/ProfilePage";
import GaragePage from "../../pages/admin/GaragePage";

test.describe("Mock tests", () => {
  let homePage: HomePage;
  let garagePage: GaragePage;
  let signInForm: SignInForm;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
    garagePage = new GaragePage(page);
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);

    await homePage.open();
    await homePage.openSignInForm();
    await signInForm.loginWithCredentials(
      process.env.ADMIN_USER_EMAIL || "",
      process.env.ADMIN_USER_PASSWORD || ""
    );
    await expect(await garagePage.getTitle()).toHaveText(
        `Garage`
      );
    await profilePage.open();
  });

  test("Check that mocked name is displayed on the page", async ({ page }) => {
    const mockedName = "Mock";
    const mockedLastName = "Mocked";


    await page.route("**/api/users/profile", (route) =>
        route.fulfill({
          contentType: "application/json",
          body: JSON.stringify({
            status: "ok",
            data: {
              userId: 170868,
              photoFilename: "default-user.png",
              name: mockedName,
              lastName: mockedLastName,
            },
          }),
        })
      );

    await profilePage.open();
    await expect(await profilePage.getFullName()).toHaveText(`${mockedName} ${mockedLastName}`);
  });
});
