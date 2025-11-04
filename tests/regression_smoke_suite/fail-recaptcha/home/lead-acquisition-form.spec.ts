import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_LAF01: Verify that an error message is displayed when reCAPTCHA validation fails on Homepage', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill('079 200 008 884');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0948348347');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});

test('TC_LAF02: Verify that an error message is displayed when reCAPTCHA validation fails on PL product page', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./tien-mat-linh-hoat/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill('079 200 008 884');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0948348347');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});
