import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_FCF01: Verify that the user can successfully submit the form', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./gui-yeu-cau-va-khieu-nai/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

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
    await expect(page.locator('div.feedback-message-result div.success-icon').first()).toBeVisible();
    await expect(page.getByText('Gửi yêu cầu thành công!').first()).toBeVisible();
    await expect(page.getByText('Cảm ơn quý khách. Chúng tôi đã tiếp nhận yêu cầu khiếu nại và sẽ phản hồi trong thời gian sớm nhất.').first()).toBeVisible();
});