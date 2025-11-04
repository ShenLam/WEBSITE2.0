import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../src/utils/wait-function';

const testCases = [
    { testcaseid: 'TC_CSP01', site: 'Khách hàng cá nhân', url: './' },
    { testcaseid: 'TC_CSP02', site: 'Khách hàng tổ chức', url: './khach-hang-to-chuc/' },
    { testcaseid: 'TC_CSP03', site: 'Ứng viên', url: 'https://tuyendung-web-uat.fecredit.cloud/' },
];

test.describe('Verify no CSP error in console logs', () => {
    for (const { testcaseid, site, url } of testCases) {
        test(`${testcaseid}: Verify CSP header on “${site}” site`, async ({ page }) => {
            const errors: string[] = [];
            const waitFunction = new WaitFunction(page);

            // Listen to console errors
            page.on('console', (msg) => {
                if (msg.type() === 'error') {
                    const text = msg.text();
                    console.log(`❌ [${site}] Console error:`, text);
                    errors.push(text);
                }
            });

            // Go to URL
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await test.step('Wait for page load complete', async () => {
                await waitFunction.pageLoadComplete();
            });

            // Check for CSP error
            const hasCspError = errors.some(err =>
                err.includes('Content Security Policy') ||
                err.includes('violates the following Content Security Policy')
            );

            expect(hasCspError).toBeFalsy(); // ❌ Fail if CSP error found
        });
    }
});
