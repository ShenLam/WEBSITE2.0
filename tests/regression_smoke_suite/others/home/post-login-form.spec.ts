import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_PL01: Verify that the user can successfully login', async ({ page }) => {
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
    await expect(page.locator('button#tab-tong-quan')).toBeVisible();
});