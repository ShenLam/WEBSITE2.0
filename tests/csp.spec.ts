import { test, expect } from '@playwright/test';

const testCases = [
    { name: 'homepage', url: './' },
    { name: 'investor page', url: './khach-hang-to-chuc/' },
    { name: 'recruitment page', url: 'https://tuyendung-web-uat.fecredit.cloud/' },
];

test.describe('Verify no CSP error in console logs', () => {
    for (const { name, url } of testCases) {
        test(`Check CSP on ${name}`, async ({ page }) => {
            const errors: string[] = [];

            // Listen to console errors
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    const text = msg.text();
                    console.log(`❌ [${name}] Console error:`, text);
                    errors.push(text);
                }
            });

            // Go to URL
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(5000); // ⏳ Wait scripts run

            // Check for CSP error
            const hasCspError = errors.some(err =>
                err.includes('Content Security Policy') ||
                err.includes('violates the following Content Security Policy')
            );

            expect(hasCspError).toBeFalsy(); // ❌ Fail if CSP error found
        });
    }
});
