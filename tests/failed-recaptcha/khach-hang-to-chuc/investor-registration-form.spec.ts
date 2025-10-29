import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../src/data/globalTestData';

test('TC_IRF03: Verify that an error message is displayed when reCAPTCHA validation fails – VN site', async ({ page }) => {
  await page.goto('./khach-hang-to-chuc/', { waitUntil: 'domcontentloaded'});
  await page.getByRole('textbox', { name: 'Tên nhà đầu tư *' }).click();
  await page.getByRole('textbox', { name: 'Tên nhà đầu tư *' }).fill('Automation test');
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0934843734');
  await page.getByRole('textbox', { name: 'Tên công ty *' }).click();
  await page.getByRole('textbox', { name: 'Tên công ty *' }).fill('Automation test');
  await page.getByLabel('Địa chỉ công ty *').selectOption('Thành phố Hồ Chí Minh');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});

test('TC_IRF03: Verify that an error message is displayed when reCAPTCHA validation fails – EN site', async ({ page }) => {
  await page.goto('./investment/', { waitUntil: 'domcontentloaded'});
  await page.getByRole('textbox', { name: 'Investor Name *' }).click();
  await page.getByRole('textbox', { name: 'Investor Name *' }).fill('Automation test');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0934843734');
  await page.getByRole('textbox', { name: 'Company Name *' }).click();
  await page.getByRole('textbox', { name: 'Company Name *' }).fill('Automation test');
  await page.getByLabel('Company Address *').selectOption('Thanh pho Ho Chi Minh');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.getByText(globalTestData.recaptchaErrorMessage.EN)).toBeVisible();
});