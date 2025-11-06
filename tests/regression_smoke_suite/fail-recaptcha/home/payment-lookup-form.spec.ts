import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_PLF04: Verify that an error message is displayed when reCAPTCHA validation fails (NID search)', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('2');
    await page.waitForTimeout(1500);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('321492751');
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});

test('TC_PLF05: Verify that an error message is displayed when reCAPTCHA validation fails (Contract search)', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('1');
    await page.waitForTimeout(1500);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('20180720-0000390');
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});

test('TC_PLF06: Verify that an error message is displayed when reCAPTCHA validation fails (Account search)', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('3');
    await page.waitForTimeout(1500);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('1500015000000360');
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});