import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../src/data/globalTestData';

test('TC_VRF05: Verify that an error message is displayed when reCAPTCHA validation fails (“THẺ ATM & TÀI KHOẢN NGÂN HÀNG”)', async ({ page }) => {
    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await page.locator('#repayment-vnpay-tab').click();
    await page.waitForTimeout(1000);
    await page.getByText('THẺ ATM & TÀI KHOẢN NGÂN HÀNG').click();
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).fill('20180720-0000390');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).press('Enter');
    await page.waitForTimeout(500);
    await page.getByText('Số tiền tối thiểu').first().click();
    await page.waitForTimeout(500);
    await page.getByText('Số tiền khác').click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).fill('999999');
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).press('Enter');
    await page.waitForTimeout(1000);
    await Promise.all([
        expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible(),
        page.getByRole('button', { name: 'Thanh toán' }).click()
    ]);
});

test('TC_VRF06: Verify that an error message is displayed when reCAPTCHA validation fails (“THANH TOÁN BẰNG MÃ QR”)', async ({ page }) => {
    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await page.locator('#repayment-vnpay-tab').click();
    await page.waitForTimeout(1000);
    await page.getByText('THANH TOÁN BẰNG MÃ QR').click();
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).fill('20180720-0000390');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).press('Enter');
    await page.waitForTimeout(500);
    await page.getByText('Số tiền tối thiểu').first().click();
    await page.waitForTimeout(500);
    await page.getByText('Số tiền khác').click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).fill('999999');
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).press('Enter');
    await page.waitForTimeout(1000);
    await Promise.all([
        expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible(),
        page.getByRole('button', { name: 'Thanh toán' }).click()
    ]);
});

test('TC_VRF07: Verify that an error message is displayed when reCAPTCHA validation fails (“VÍ ĐIỆN TỬ”)', async ({ page }) => {
    await page.goto('./thanh-toan-truc-tuyen/', { waitUntil: 'domcontentloaded' });
    await page.locator('#repayment-vnpay-tab').click();
    await page.waitForTimeout(1000);
    await page.getByText('VÍ ĐIỆN TỬ').click();
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).fill('20180720-0000390');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số hợp đồng *' }).press('Enter');
    await page.waitForTimeout(500);
    await page.getByText('Số tiền tối thiểu').first().click();
    await page.waitForTimeout(500);
    await page.getByText('Số tiền khác').click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).fill('999999');
    await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).press('Enter');
    await page.waitForTimeout(1000);
    await Promise.all([
        expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible(),
        page.getByRole('button', { name: 'Thanh toán' }).click()
    ]);
});