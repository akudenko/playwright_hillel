import { test as base } from '@playwright/test';

type screenFixtures = {
    pageSmall: any,
    pageMedium: any,
    pageBig: any
}

export const test = base.extend<screenFixtures>({
    pageSmall: async ({ page }, use) => {

        await page.setViewportSize({ width: 300, height: 300 });

        await use(page);

        console.log('AFTER TEST');
    },
    pageMedium: async ({ page }, use) => {
        await page.setViewportSize({ width: 700, height: 700 });
        await use(page)
    },
    pageBig: async ({ page }, use) => {
        await page.setViewportSize({ width: 1000, height: 1000 });
        await use(page)
    },
})