import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_PLF01: Verify that the user can successfully search using NID', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('2');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('321492751');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.locator('div.repayment-lookup-result-success')).toBeVisible();
});

test('TC_PLF02: Verify that the user can successfully search using Contract Number', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('1');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('20180720-0000390');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.locator('div.repayment-lookup-result-success')).toBeVisible();
});

test('TC_PLF03: Verify that the user can successfully search using Account Number', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByLabel('Chọn hình thức truy vấn').selectOption('3');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Thông tin truy vấn' }).fill('1500015000000360');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Tra cứu' }).click();
    await expect(page.locator('div.repayment-lookup-result-success')).toBeVisible();
});