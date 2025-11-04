import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_DNBF02: Verify that an error message is displayed when reCAPTCHA validation fails', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./tra-cuu-khong-lam-phien/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0934843747');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).fill('079 200 232 382');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Tìm kiếm' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});