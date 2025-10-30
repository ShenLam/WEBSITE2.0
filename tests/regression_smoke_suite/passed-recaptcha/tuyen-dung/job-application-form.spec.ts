import { test, expect } from '@playwright/test';

test.skip('TC_JAF01: Verify that the user can successfully submit the form', async ({ page }) => {
    await page.goto('https://tuyendung-web-uat.fecredit.cloud/ung-tuyen/danh-sach-vi-tri-dang-mo/nhan-vien-tu-van-tin-dung-qua-dien-thoai/',
        { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0934366346');
    await page.waitForTimeout(500);

    await page.getByLabel('Trình độ học vấn *').selectOption('Tốt nghiệp THPT');
    await page.waitForTimeout(500);

    await page.getByLabel('Tỉnh/Thành phố *').selectOption('Thành phố Hồ Chí Minh');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Nộp đơn ngay' }).click();
    // await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});
