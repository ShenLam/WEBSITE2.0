import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../src/data/globalTestData';

test('TC_FCF02: Verify that an error message is displayed when reCAPTCHA validation fails', async ({ page }) => {
    await page.goto('./gui-yeu-cau-va-khieu-nai/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0983474743');
    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
    await page.getByRole('textbox', { name: 'Tiêu đề thư *' }).click();
    await page.getByRole('textbox', { name: 'Tiêu đề thư *' }).fill('Automation test');
    await page.getByRole('textbox', { name: 'Nội dung thư *' }).click();
    await page.getByRole('textbox', { name: 'Nội dung thư *' }).fill('Automation test');
    await page.getByRole('button', { name: 'Gửi' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});