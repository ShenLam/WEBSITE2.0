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

test('TC_IRF05: Verify that deposit calculator works correctly when user calculates on form – VN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./khach-hang-to-chuc/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  // Verify on Tiền gửi có kỳ hạn section
  await expect(page.locator('#materials .nav-item button').nth(0)).toHaveClass('nav-link active')

  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).click();
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('01/01/2027');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: '500,000,000' }).click();
  await page.getByRole('textbox', { name: '500,000,000' }).fill('500000000');
  await page.waitForTimeout(500);

  await page.locator('#materials').getByRole('combobox').selectOption('20');
  await page.waitForTimeout(500);

  await expect(page.locator('.deposit-input-interest').first()).toHaveValue('7.30')
  await page.getByRole('button', { name: 'Tính' }).click();
  await expect(page.locator('#materials').getByText('01/09/2028').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('609 ngày').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('60,900,000 VND').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('560,900,000 VND').first()).toBeVisible();

  await page.reload();
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  // Verify on Chứng chỉ tiền gửi section
  await page.locator('#materials .nav-item button').nth(1).click();
  await expect(page.locator('#materials .nav-item button').nth(1)).toHaveClass('nav-link active')
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).click();
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('01/01/2027');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: '500,000,000' }).click();
  await page.getByRole('textbox', { name: '500,000,000' }).fill('500000000');
  await page.waitForTimeout(500);

  await page.locator('#materials').getByRole('combobox').selectOption('20');
  await page.waitForTimeout(500);

  await expect(page.locator('.deposit-input-interest').nth(1)).toHaveValue('7.10')
  await page.getByRole('button', { name: 'Tính' }).click();
  await expect(page.locator('#materials').getByText('01/09/2028').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('609 ngày').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('59,231,506 VND').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('559,231,506 VND').first()).toBeVisible();
});

test('TC_IRF06: Verify that deposit calculator works correctly when user calculates on form – EN site', async ({ page }) => {
  const waitFunction = new WaitFunction(page);

  await page.goto('./investment/', { waitUntil: 'domcontentloaded' });
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  // Verify on Tiền gửi có kỳ hạn section
  await expect(page.locator('#materials .nav-item button').nth(0)).toHaveClass('nav-link active')

  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).click();
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('03/03/2027');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: '500,000,000' }).click();
  await page.getByRole('textbox', { name: '500,000,000' }).fill('123123123');
  await page.waitForTimeout(500);

  await page.locator('#materials').getByRole('combobox').selectOption('11');
  await page.waitForTimeout(500);

  await expect(page.locator('.deposit-input-interest').first()).toHaveValue('7.15')
  await page.getByRole('button', { name: 'Calculate' }).click();
  await expect(page.locator('#materials').getByText('03/02/2028').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('337 day(s)').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('8,127,981 VND').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('131,251,104 VND').first()).toBeVisible();

  await page.reload();
  await test.step('Wait for page load complete', async () => {
    await waitFunction.pageLoadComplete();
  });

  // Verify on Chứng chỉ tiền gửi section
  await page.locator('#materials .nav-item button').nth(1).click();
  await expect(page.locator('#materials .nav-item button').nth(1)).toHaveClass('nav-link active')
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).click();
  await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('09/09/2027');
  await page.waitForTimeout(500);

  await page.getByRole('textbox', { name: '500,000,000' }).click();
  await page.getByRole('textbox', { name: '500,000,000' }).fill('999999999');
  await page.waitForTimeout(500);

  await page.locator('#materials').getByRole('combobox').selectOption('9');
  await page.waitForTimeout(500);

  await expect(page.locator('.deposit-input-interest').nth(1)).toHaveValue('6.95')
  await page.getByRole('button', { name: 'Calculate' }).click();
  await expect(page.locator('#materials').getByText('09/06/2028').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('274 day(s)').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('52,172,602 VND').first()).toBeVisible();
  await expect(page.locator('#materials').getByText('1,052,172,601 VND').first()).toBeVisible();
});