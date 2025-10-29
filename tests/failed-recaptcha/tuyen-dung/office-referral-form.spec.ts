import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../src/data/globalTestData';

test('TC_ORF02: Verify that an error message is displayed when reCAPTCHA validation fails', async ({ page }) => {
    await page.goto('https://tuyendung-web-uat.fecredit.cloud/gioi-thieu-ung-vien/#khoi-van-phong',
        { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('tab', { name: 'Khối văn phòng' })).toHaveClass('nav-link active');
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Họ và tên').click();
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Họ và tên').fill('Automation test');
    await page.getByRole('textbox', { name: 'Email công ty *' }).click();
    await page.getByRole('textbox', { name: 'Email công ty *' }).fill('automationtest@gm.co');
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Nguyễn Văn A').click();
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByPlaceholder('Nguyễn Văn A').fill('Automation test');
    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).fill('079 200 393 238');
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0937747347');
    await page.getByRole('textbox', { name: 'Email cá nhân *' }).click();
    await page.getByRole('textbox', { name: 'Email cá nhân *' }).fill('automationtest@gm.co');
    await page.getByRole('tabpanel', { name: 'Nộp đơn ngay Các vị trí tuyển' }).getByLabel('Vị trí *').selectOption('1');
    await page.getByRole('button', { name: 'Nộp đơn ngay' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN).nth(1)).toBeVisible();
});
