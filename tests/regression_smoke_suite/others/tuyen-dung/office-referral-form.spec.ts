import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_ORF01: Verify that the user can successfully submit the form', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('https://tuyendung-web-uat.fecredit.cloud/gioi-thieu-ung-vien/#khoi-van-phong',
        { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });
    await expect(page.getByRole('tab', { name: 'Khối văn phòng' })).toHaveClass('nav-link active');

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

    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByLabel('Vị trí *').selectOption('1');
    await page.waitForTimeout(500);

    await page.locator(`input[type='file']`).setInputFiles([
        'src/files/1-MB-DOC.doc',
        'src/files/Free_Test_Data_1MB_XLSX.xlsx',
        'src/files/Free_Test_Data_3MB_PDF.pdf']);
    await page.waitForTimeout(1500);

    await page.getByRole('button', { name: 'Nộp đơn ngay' }).click();
    await expect(page.locator('div.success-icon').nth(1)).toBeVisible();
    await expect(page.getByText('Ứng tuyển thành công!').nth(1)).toBeVisible();
    await expect(page.getByText('FE Credit sẽ liên hệ tới bạn trong thời gian sớm nhất').nth(1)).toBeVisible();
});
