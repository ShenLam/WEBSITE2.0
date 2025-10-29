import { test, expect } from '@playwright/test';

test('TC_NRF01: Verify that the user can successfully submit the form – VN site', async ({ page }) => {
    const [response] = await Promise.all([
        page.waitForResponse((response) => response.url().includes('recaptcha__en.js')
            && response.request().resourceType() === 'text/javascript',
            { timeout: 15000 }),
        page.goto('./khach-hang-to-chuc/', { waitUntil: 'domcontentloaded' }),
    ]);
    expect(response.status()).toBe(200);

    await page.getByRole('button', { name: 'Đăng ký email, nhận ngay ưu' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').click();
    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').click();
    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').fill('0934847747');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Căn cước công dân' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân' }).fill('079 200 238 374');
    await page.waitForTimeout(500);

    await page.locator('#letter-form-id').getByRole('button', { name: 'Đăng ký' }).click();
    await expect(page.locator('div.popup-icon-image-success')).toBeVisible();
    await expect(page.locator('div.popup-information-success')).toBeVisible();
    await expect(page.locator('div.popup-information-success h6')).toContainText(' Chúc mừng bạn đã đăng ký thành công!');
    await expect(page.locator('div.popup-information-success p').nth(1)).toContainText('Kiểm tra hòm thư để nhận ngay ưu đãi đặc biệt từ FE CREDIT');
});

test('TC_NRF02: Verify that the user can successfully submit the form – EN site', async ({ page }) => {
    await page.route('**/recaptcha__en.js**', route => route.continue());
await page.goto('./investment/', { waitUntil: 'domcontentloaded' });
await Promise.all([
  page.waitForResponse(res => res.url().includes('render=') && res.status() === 200),
  page.waitForResponse(res => res.url().includes('ar=') && res.status() === 200),
  page.waitForResponse(res => res.url().includes('hl=en') && res.status() === 200),
]);


    await page.getByRole('button', { name: 'Register email, receive promotion' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Full Name *' }).click();
    await page.getByRole('textbox', { name: 'Full Name *' }).fill('Automation test');
    await page.waitForTimeout(500);

    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').click();
    await page.locator('input[name="\\33 a2915fb-ab8b-4977-b0a2-7427f9ba331c"]').fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').click();
    await page.locator('input[name="\\32 65c4f69-4837-4121-ac19-0c4bec822f60"]').fill('0934847747');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'National ID' }).click();
    await page.getByRole('textbox', { name: 'National ID' }).fill('079 200 238 374');
    await page.waitForTimeout(500);

    await page.locator('#letter-form-id').getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('div.popup-icon-image-success')).toBeVisible();
    await expect(page.locator('div.popup-information-success')).toBeVisible();
    await expect(page.locator('div.popup-information-success h6')).toContainText(' Congratulations on your successful registration');
    await expect(page.locator('div.popup-information-success p').nth(1)).toContainText('Check your inbox to receive special offers from FE CREDIT');
});