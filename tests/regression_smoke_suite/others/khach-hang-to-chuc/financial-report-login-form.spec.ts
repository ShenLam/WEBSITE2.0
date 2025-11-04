import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_FRLF01: Verify that the user can successfully login – VN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./khach-hang-to-chuc/bao-cao-tai-chinh/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Mật khẩu *' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.locator('div.account-navigation').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').last()).toBeVisible();
});

test('TC_FRLF02: Verify that the user can successfully login – EN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./investment/report-invesment/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Username *' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('div.account-navigation').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').last()).toBeVisible();
});

test('TC_FRLF05: Verify that after login, the user can download financial report – VN site', async ({ page, context }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./khach-hang-to-chuc/bao-cao-tai-chinh/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Mật khẩu *' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.locator('div.account-navigation').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').last()).toBeVisible();

  // Start waiting for new page before clicking
  const pagePromise = context.waitForEvent('page');
  // Click item on Báo cáo tài chính section
  await page.locator('section.usn_cmp_reporttab').nth(0).getByText('Xem chi tiết').first().click();
  const newPage = await pagePromise;
  // Interact with the new page normally
  expect(newPage.url()).toContain('/file/');
  expect(newPage.url()).toContain('.pdf?rb=%2Fkhach-hang-to-chuc%2Fbao-cao-tai-chinh%2F');

  const response = await newPage.request.get(newPage.url());
  await expect(response).toBeOK();
  expect(response.headers()['content-type']).toContain('application/pdf');
});

test('TC_FRLF06: Verify that after login, the user can download financial report – EN site', async ({ page, context }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./investment/report-invesment/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Username *' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('div.account-navigation').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').first()).toBeVisible();
  await expect(page.locator('div.report-tab-title').last()).toBeVisible();

  // Start waiting for new page before clicking
  const pagePromise = context.waitForEvent('page');
  // Click item on Công bố thông tin khác section
  await page.locator('section.usn_cmp_reporttab').nth(1).getByText('View details').first().click();
  const newPage = await pagePromise;
  // Interact with the new page normally
  expect(newPage.url()).toContain('/file/');
  expect(newPage.url()).toContain('.pdf?rb=%2Finvestment%2Freport-invesment%2F');

  const response = await newPage.request.get(newPage.url());
  await expect(response).toBeOK();
  expect(response.headers()['content-type']).toContain('application/pdf');
});