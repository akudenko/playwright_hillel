import { defineConfig, devices } from '@playwright/test';
require('dotenv').config()

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: '90%',
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USER_NAME ? process.env.USER_NAME: '',
      password: process.env.PASSWORD ? process.env.PASSWORD: '',
    },
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'setup/**/*.ts'
    },
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'e2e/**/*.ts',
      dependencies: ['setup']
    },
    {
      name: 'api',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'api/**/*.ts'
    },
    {
      name: 'practice',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'practice/**/*.ts'
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
