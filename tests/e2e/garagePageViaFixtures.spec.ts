import { test } from "../../test-data/fixtures/index";
import AlertComponent from "../../pages/components/AlertComponent";

test.describe("Garage Tests via fixture and storage session", () => {
  test("User is able to add BMW car to the garage", async ({ garagePageAsLoggedMainUser }) => {
    await garagePageAsLoggedMainUser.openAddNewCarPopupByClick();
    await garagePageAsLoggedMainUser.addNewCar("BMW", "5", "200");
    await garagePageAsLoggedMainUser.addedCarShouldBeDisplayed("BMW 5");
  });

  test("User is able to add Ford car to the garage", async ({ garagePageAsLoggedMainUser }) => {
    await garagePageAsLoggedMainUser.openAddNewCarPopupByClick();
    await garagePageAsLoggedMainUser.addNewCar("Ford", "Focus", "200");
    await garagePageAsLoggedMainUser.addedCarShouldBeDisplayed("Ford Focus");
  });
});
