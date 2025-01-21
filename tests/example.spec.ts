import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Hillel Qauto');
});

test('get started link', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.header_logo')).toBeVisible();
});
