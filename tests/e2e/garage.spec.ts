import { test, expect } from "@playwright/test";
import GaragePage from "../../pages/admin/GaragePage";
import AlertComponent from "../../pages/components/AlertComponent";
import HomePage from "../../pages/HomePage";
import SignInForm from "../../pages/forms/SignInForm";

test.describe("Garage Tests", () => {
  test.use({ storageState: "test-results/adminUserState.json" });

  let garagePage: GaragePage;
  let alertComponent: AlertComponent;
  let homePage: HomePage;
  let signInForm: SignInForm;

  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    alertComponent = new AlertComponent(page);
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    // await homePage.open();
    // // await homePage.openSignInForm();
    // // await signInForm.loginWithCredentials(
    // //   process.env.ADMIN_USER_EMAIL || '',
    // //   process.env.ADMIN_USER_PASSWORD || ''
    // // );
    await garagePage.open();
    await garagePage.removeAllCars();
  });

  test.afterEach(async () => {
    await garagePage.removeAllCars();
  });

  test("User is able to add BMW car to the garage", async () => {
    await garagePage.openAddNewCarPopupByClick();
    await garagePage.addNewCar("BMW", "5", "200");
    await garagePage.addedCarShouldBeDisplayed("BMW 5");
    await alertComponent.alertMessageShouldContainText("Car added");
  });

  test("User is able to add Ford car to the garage", async () => {
    await garagePage.openAddNewCarPopupByClick();
    await garagePage.addNewCar("Ford", "Focus", "200");
    await garagePage.addedCarShouldBeDisplayed("Ford Focus");
    await alertComponent.alertMessageShouldContainText("Car added");
  });
});

