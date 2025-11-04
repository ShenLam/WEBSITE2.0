// import { test, expect } from '@playwright/test';
// import { WaitFunction } from '../../../src/utils/wait-function';

// test(`TC_UV04: Verify 404 Page on Khách hàng cá nhân site`, async ({ page }) => {
//     const waitFunction = new WaitFunction(page);

//     await page.goto('./tin-tuc-khuyen-mai/tin-tuc/', { waitUntil: 'domcontentloaded' });
//     await test.step('Wait for page load complete', async () => {
//         await waitFunction.pageLoadComplete();
//     });

//     await page.locator('#location_button').click();
//     await test.step('Wait for page load complete', async () => {
//         await waitFunction.pageLoadComplete();
//     });
//     await expect(page).toHaveURL('./tim-diem-thanh-toan-giai-ngan/');

//     await page.locator('#fpt_ai_livechat_button').click();
//     await page.locator('iframe[name="1762271083434"]').contentFrame().getByRole('textbox').click();
//     await page.locator('iframe[name="1762271083434"]').contentFrame().getByRole('textbox').fill('automationtest');
//     await page.locator('iframe[name="1762271083434"]').contentFrame().locator('.btn-start').click();
//     await expect(page.locator('iframe[name="1762271083434"]').contentFrame().locator('div.msg-2')).toHaveText('Bắt đầu')
// });