import { test, expect } from '@playwright/test';

test('TC_CTF01: Verify that the user can successfully submit the form', async ({ page }) => {
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
    await page.waitForTimeout(500);
    await expect(page.locator('div.success-icon').first()).toBeVisible();
    await expect(page.getByText('Gửi thư thành công!').first()).toBeVisible();
    await expect(page.getByText('Cảm ơn bạn đã liên hệ tới FE CREDIT! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.').first()).toBeVisible();
});