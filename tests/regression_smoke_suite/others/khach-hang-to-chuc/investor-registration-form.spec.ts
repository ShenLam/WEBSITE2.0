import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_IRF01: Verify that the user can successfully submit the form – VN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./khach-hang-to-chuc/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Tên nhà đầu tư *' }).click();
  await page.getByRole('textbox', { name: 'Tên nhà đầu tư *' }).fill('Automation test');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
  await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0934843734');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Tên công ty *' }).click();
  await page.getByRole('textbox', { name: 'Tên công ty *' }).fill('Automation test');
  await page.waitForTimeout(1000);

  await page.getByLabel('Địa chỉ công ty *').selectOption('Thành phố Hồ Chí Minh');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await expect(page.locator('div.success-icon').first()).toBeVisible();
  await expect(page.getByText('Đăng ký thành công!').first()).toBeVisible();
  await expect(page.getByText('Tư vấn viên sẽ liên hệ tới quý khách trong thời gian sớm nhất').first()).toBeVisible();
});

test('TC_IRF02: Verify that the user can successfully submit the form – EN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./investment/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  await page.getByRole('textbox', { name: 'Investor Name *' }).click();
  await page.getByRole('textbox', { name: 'Investor Name *' }).fill('Automation test');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0934843734');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Company Name *' }).click();
  await page.getByRole('textbox', { name: 'Company Name *' }).fill('Automation test');
  await page.waitForTimeout(1000);

  await page.getByLabel('Company Address *').selectOption('Thanh pho Ho Chi Minh');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(page.locator('div.success-icon').first()).toBeVisible();
  await expect(page.getByText('Registration successful!').first()).toBeVisible();
  await expect(page.getByText('The consultant will contact you as soon as possible.').first()).toBeVisible();
});