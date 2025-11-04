import { test, expect } from '@playwright/test';
import { globalTestData } from '../../../../src/data/globalTestData';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_NRF03: Verify that an error message is displayed when reCAPTCHA validation fails – VN site', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./khach-hang-to-chuc/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('button', { name: 'Đăng ký email, nhận ngay ưu' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(1000);

    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').click();
    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').fill('automationtest@gm.co');
    await page.waitForTimeout(1000);

    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').click();
    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').fill('0934847747');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Căn cước công dân' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân' }).fill('079 200 092 234');
    await page.waitForTimeout(1000);

    await page.locator('#letter-form-id').getByRole('button', { name: 'Đăng ký' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.VN)).toBeVisible();
});

test('TC_NRF04: Verify that an error message is displayed when reCAPTCHA validation fails – EN site', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./investment/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('button', { name: 'Register email, receive promotion' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'Full Name *' }).click();
    await page.getByRole('textbox', { name: 'Full Name *' }).fill('Automation test');
    await page.waitForTimeout(1000);

    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').click();
    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').fill('automationtest@gm.co');
    await page.waitForTimeout(1000);

    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').click();
    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').fill('0934847747');
    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: 'National ID' }).click();
    await page.getByRole('textbox', { name: 'National ID' }).fill('079 200 092 234');
    await page.waitForTimeout(1000);

    await page.locator('#letter-form-id').getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(globalTestData.recaptchaErrorMessage.EN)).toBeVisible();
});