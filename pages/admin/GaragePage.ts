import { expect, Locator, Page } from "@playwright/test";

export default class GaragePage {
  readonly title: Locator;
  readonly addNewCarBtn: Locator;
  readonly brandDropdown: Locator;
  readonly modelDropdown: Locator;
  readonly mileageInput: Locator;
  readonly confirmAdding: Locator;
  readonly addedCars: Locator;
  readonly editBtn: Locator;
  readonly removeBtn: Locator;
  readonly confirmRemoveBtn: Locator;
  readonly emptyGarageMessage: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator(".h3");
    this.addNewCarBtn = page.locator(".panel-page_heading button");
    this.brandDropdown = page.locator("#addCarBrand");
    this.modelDropdown = page.locator("#addCarModel");
    this.mileageInput = page.locator("#addCarMileage");
    this.confirmAdding = page.locator(".modal .btn-primary");
    this.addedCars = page.locator(".car-list li");
    this.editBtn = page.locator(".icon-edit");
    this.removeBtn = page.locator(".btn-outline-danger");
    this.confirmRemoveBtn = page.locator(".btn-danger");
    this.emptyGarageMessage = page.locator(".panel-empty_message");
  }

  async open() {
    await this.page.goto("/panel/garage");
  }

  async getTitle() {
    return this.title;
  }

  async openAddNewCarPopupByClick() {
    await this.addNewCarBtn.click();
  }

  async addNewCar(brand: string, model: string, mileage: string) {
    await this.brandDropdown.selectOption(brand);
    await this.modelDropdown.selectOption(model);
    await this.mileageInput.fill(mileage);
    await this.confirmAdding.click();
  }

  async addedCarShouldBeDisplayed(model: string) {
    await expect(this.addedCars.first()).toContainText(model);
    await expect(this.addedCars).toHaveCount(1);
  }

  async getCountCars() {
    return this.addedCars;
  }

  async removeAllCars() {
    while ((await this.addedCars.count()) > 0) {
      const firstCar = this.addedCars.first();
      await firstCar.locator(".icon-edit").click();
      await this.page.locator("button", { hasText: "Remove car" }).click();
      await this.page.locator(".btn-danger").click();
      await this.page.waitForTimeout(500);
    }

    await expect(this.emptyGarageMessage).toHaveText(
      "You don’t have any cars in your garage"
    );
  }
}
