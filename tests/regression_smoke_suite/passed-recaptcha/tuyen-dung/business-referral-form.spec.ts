import { test, expect } from '@playwright/test';

test.only('TC_BRF01: Verify that the user can successfully submit the form', async ({ page }) => {
    await page.goto('https://tuyendung-web-uat.fecredit.cloud/gioi-thieu-ung-vien/#khoi-kinh-doanh',
        { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await expect(page.getByRole('tab', { name: 'Khối kinh doanh - Thu phí - Thẩm định' })).toHaveClass('nav-link active');

    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Họ và tên').click();
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Họ và tên').fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email công ty *' }).click();
    await page.getByRole('textbox', { name: 'Email công ty *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Nguyễn Văn A').click();
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Nguyễn Văn A').fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).fill('079 200 393 238');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0937747347');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email cá nhân *' }).click();
    await page.getByRole('textbox', { name: 'Email cá nhân *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByLabel('Tỉnh/Thành phố *', { exact: true }).selectOption('Thành phố Hồ Chí Minh');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Trưởng nhóm phụ trách *' }).click();
    await page.getByRole('textbox', { name: 'Trưởng nhóm phụ trách *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByLabel('Vị trí *').selectOption('1');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Nộp đơn ngay' }).click();
    await expect(page.locator('div.success-icon').first()).toBeVisible();
    await expect(page.getByText('Ứng tuyển thành công!').first()).toBeVisible();
    await expect(page.getByText('FE Credit sẽ liên hệ tới bạn trong thời gian sớm nhất').first()).toBeVisible();
});
