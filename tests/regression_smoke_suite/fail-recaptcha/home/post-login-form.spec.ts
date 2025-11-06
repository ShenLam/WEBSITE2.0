import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';
import { globalTestData } from '../../../../src/data/globalTestData';

test('TC_PL02: Verify that an error message is displayed when reCAPTCHA validation fails', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./dang-nhap/');
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('textbox', { name: 'Tên đăng nhập' }).click();
    await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('0908000042');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Mật khẩu' }).click();
    await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('Abc@123456');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});