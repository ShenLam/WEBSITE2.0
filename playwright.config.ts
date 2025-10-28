import { defineConfig, devices } from '@playwright/test';
import uatEnv from './src/env/uat.json';
import prodEnv from './src/env/prod.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['html'], ['list']],
  use: {
    screenshot: 'on',
  },
  timeout: 240 * 1000, // Maximum duration (in ms) for a single test case to complete
  expect: {
    timeout: 80 * 1000 // Maximum time (in ms) for expect() assertions to pass
  },
  projects: [
    {
      name: 'uat',
      metadata: uatEnv,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        baseURL: 'https://web-uat.fecredit.cloud',
      },
    },
    {
      name: 'prod',
      metadata: prodEnv,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        baseURL: 'https://www.fecredit.com.vn/',
      },
    },
  ],
});
