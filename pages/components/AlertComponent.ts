import { expect, Locator, Page } from "@playwright/test";

export default class AlertComponent {
  readonly alertMessage: Locator;

  constructor(private readonly page: Page) {
    this.alertMessage = page.locator(".alert p").last();
  }

  async alertMessageShouldContainText(text: string) {
    await expect(this.alertMessage).toHaveText(text);
  }
}
