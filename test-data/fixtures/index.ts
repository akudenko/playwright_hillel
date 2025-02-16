import { mergeTests } from '@playwright/test';
import { test as pages } from '../fixtures/fixturePages';
import { test as sizes } from '../fixtures/screenSizesFixture';

export const test = mergeTests(pages, sizes);