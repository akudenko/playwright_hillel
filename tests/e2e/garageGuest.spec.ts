import { test, expect } from "@playwright/test";
import GaragePage from "../../pages/admin/GaragePage";
import HomePage from "../../pages/HomePage";
import cars from "../../test-data/cars/cars.json";
import StorageHelper from "../../utils/storageHelpers"


test("Test with mocked 3 cars", async ({ page }) => {
  const garagePage = new GaragePage(page);
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.clickOnGuestLoginBtn();

  await StorageHelper.setSessionStorage(page, "guestData", cars);

  await garagePage.open();
  await expect(await garagePage.getCountCars()).toHaveCount(3);

});
