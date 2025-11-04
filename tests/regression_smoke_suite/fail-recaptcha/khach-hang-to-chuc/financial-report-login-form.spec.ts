import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_FRLF03: Verify that an error message is displayed when reCAPTCHA validation fails – VN site', async ({ page }) => {
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
  await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN).first()).toBeVisible();
});

test('TC_FRLF04: Verify that an error message is displayed when reCAPTCHA validation fails – EN site', async ({ page }) => {
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
  await expect(page.getByText(globalTestData.recaptchaErrorMessage.EN).first()).toBeVisible();
});