import { test, expect } from '@playwright/test';

test.skip('TC_FRLF01: Verify that the user can successfully login – VN site', async ({ page }) => {
  await page.goto('./khach-hang-to-chuc/bao-cao-tai-chinh/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Mật khẩu *' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  // await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN).first()).toBeVisible();
});

test.skip('TC_FRLF02: Verify that the user can successfully login – EN site', async ({ page }) => {
  await page.goto('./investment/report-invesment/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Username *' }).click();
  await page.getByRole('textbox', { name: 'Username *' }).fill('uatuser_test');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Usertest@123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Log In' }).click();
  // await expect(page.getByText(globalTestData.recaptchaErrorMessage.EN).first()).toBeVisible();
});