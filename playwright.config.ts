import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['html'], ['list']],
  use: {
    screenshot: 'on',
    baseURL: 'https://web-uat.fecredit.cloud'
  },
  timeout: 240 * 1000, // Maximum duration (in ms) for a single test case to complete
  expect: {
    timeout: 80 * 1000 // Maximum time (in ms) for expect() assertions to pass
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      }
    },
  ],
});
