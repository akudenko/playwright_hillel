import { test as base } from "@playwright/test";
import GaragePage from "../../pages/admin/GaragePage";
import ProfilePage from "../../pages/admin/ProfilePage";
import SignInForm from "../../pages/forms/SignInForm";
import SignUpForm from "../../pages/forms/SignUpForm";
import HomePage from "../../pages/HomePage";

type fixturePages = {
  garagePage: GaragePage;
  garagePageAsLoggedMainUser: GaragePage;
  garagePageAsLoggedMainUserWithRemovingLastCar: GaragePage;
};

let homePage: HomePage;
let garagePage: GaragePage;
let profilePage: ProfilePage;
let signUpForm: SignUpForm;
let signInForm: SignInForm;

export const test = base.extend<fixturePages>({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await garagePage.removeAllCars();
    await use(garagePage);
  },

  garagePageAsLoggedMainUser: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "test-data/states/adminUserState.json",
    });
    const page = await context.newPage();

    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);

    await garagePage.open();
    await garagePage.removeAllCars();

    await use(garagePage);

    await garagePage.removeAllCars();
    await context.close();


    // await homePage.open();
    // await homePage.openSignInForm();
    // await signInForm.loginWithCredentials(
    //   process.env.ADMIN_USER_EMAIL || "",
    //   process.env.ADMIN_USER_PASSWORD || ""
    // );
    // await garagePage.removeAllCars();
    // await use(garagePage);
    // await garagePage.removeAllCars();
  },
});
