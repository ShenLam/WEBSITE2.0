import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_JAF01: Verify that the user can successfully submit the form', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('https://tuyendung-web-uat.fecredit.cloud/ung-tuyen/danh-sach-vi-tri-dang-mo/nhan-vien-tu-van-tin-dung-qua-dien-thoai/',
        { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

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

    await page.locator(`input[type='file']`).setInputFiles([
        'src/files/1-MB-DOC.doc',
        'src/files/Free_Test_Data_1MB_XLSX.xlsx',
        'src/files/Free_Test_Data_3MB_PDF.pdf']);
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Nộp đơn ngay' }).click();
    await expect(page.locator('div.success-icon').first()).toBeVisible();
    await expect(page.getByText('Ứng tuyển thành công!').first()).toBeVisible();
    await expect(page.getByText('FE Credit sẽ liên hệ tới bạn').first()).toBeVisible();
    await expect(page.getByText('trong thời gian sớm nhất').first()).toBeVisible();
});
