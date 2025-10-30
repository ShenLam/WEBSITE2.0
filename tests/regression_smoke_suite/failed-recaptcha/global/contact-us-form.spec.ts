import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';

test('TC_CTF02: Verify that an error message is displayed when reCAPTCHA validation fails', async ({ page }) => {
    await page.goto('./lien-he/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    await page.getByLabel('Gửi đến *').selectOption('bophantuyendung@fecredit.com.vn');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0983474743');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Tiêu đề thư *' }).click();
    await page.getByRole('textbox', { name: 'Tiêu đề thư *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Nội dung thư *' }).click();
    await page.getByRole('textbox', { name: 'Nội dung thư *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Gửi' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});