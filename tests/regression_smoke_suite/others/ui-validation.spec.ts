import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../src/utils/wait-function';
import { globalTestData } from '../../../src/data/globalTestData';

test(`TC_UV04: Verify 404 Page on Khách hàng cá nhân site`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./testing', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await expect(page.getByText(globalTestData.notFoundPageTitle.VN)).toBeVisible();
    await expect(page.getByText('Xin vui lòng ấn vào nút quay lại trên trình duyệt hoặc quay về trang chủ để tiếp tục!')).toBeVisible();
    await expect(page.getByText('Trang chủ', { exact: true })).toBeVisible();

    await page.getByText('Trang chủ', { exact: true }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL('./')
});

test(`TC_UV05: Verify 404 Page on Khách hàng tổ chức - VN site`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./khach-hang-to-chuc/testing', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await expect(page.getByText(globalTestData.notFoundPageTitle.VN)).toBeVisible();
    await expect(page.getByText('Xin vui lòng ấn vào nút quay lại trên trình duyệt hoặc quay về trang khách hàng tổ chức để tiếp tục!')).toBeVisible();
    await expect(page.locator('div.code-item').getByText('Khách hàng tổ chức', { exact: true })).toBeVisible();

    await page.locator('div.code-item').getByText('Khách hàng tổ chức', { exact: true }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL('./khach-hang-to-chuc/')
});

test(`TC_UV06: Verify 404 Page on Khách hàng tổ chức - EN site`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./investment/testing', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await expect(page.getByText(globalTestData.notFoundPageTitle.EN)).toBeVisible();
    await expect(page.getByText('Please click the browser’s back button or return to the Institutional Client page to continue!')).toBeVisible();
    await expect(page.locator('div.code-item').getByText('Institutional Client', { exact: true })).toBeVisible();

    await page.locator('div.code-item').getByText('Institutional Client', { exact: true }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL('./investment/')
});

test(`TC_UV07: Verify 404 Page on Ứng viên site`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('https://tuyendung-web-uat.fecredit.cloud/testing', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await expect(page.getByText(globalTestData.notFoundPageTitle.VN)).toBeVisible();
    await expect(page.getByText('Xin vui lòng ấn vào nút quay lại trên trình duyệt hoặc quay về trang Ứng viên để tiếp tục!')).toBeVisible();
    await expect(page.locator('div.code-item').getByText('Ứng viên', { exact: true })).toBeVisible();

    await page.locator('div.code-item').getByText('Ứng viên', { exact: true }).click();
    await page.waitForTimeout(1500);
    await expect(page).toHaveURL('https://tuyendung-web-uat.fecredit.cloud/')
});

