import { Page } from "@playwright/test";

export default class StorageHelper {
  static async setSessionStorage(page: Page, key: string, data: any) {
    await page.evaluate(([storageKey, storageData]) => {
      window.sessionStorage.setItem(storageKey, JSON.stringify(storageData));
    }, [key, data]);
  }

  static async getSessionStorage(page: Page, key: string) {
    return await page.evaluate((storageKey) => {
      return JSON.parse(window.sessionStorage.getItem(storageKey) || "null");
    }, key);
  }

  static async clearSessionStorage(page: Page) {
    await page.evaluate(() => window.sessionStorage.clear());
  }
}
