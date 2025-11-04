import { test, expect } from '@playwright/test';
import { WaitFunction } from '../../../../src/utils/wait-function';

test('TC_DNBF01: Verify that the user can successfully submit the form', async ({ page }) => {
    const waitFunction = new WaitFunction(page);

    await page.goto('./tra-cuu-khong-lam-phien/', { waitUntil: 'domcontentloaded' });
    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
    await page.getByRole('textbox', { name: 'Họ và tên *' }).fill('Automation test');

    await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
    await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0326478234');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).click();
    await page.getByRole('textbox', { name: 'Căn cước công dân *' }).fill('033 184 010 064');
    await page.waitForTimeout(500);

    await page.getByRole('textbox', { name: 'Email *' }).click();
    await page.getByRole('textbox', { name: 'Email *' }).fill('automationtest@gm.co');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Tìm kiếm' }).click();
    await expect(page.locator('div.header').getByText('Nguyen Thi A45')).toBeVisible();
    expect(page.getByRole('textbox', { name: 'Họ và tên *' })).toHaveValue('');
    expect(page.getByRole('textbox', { name: 'Số điện thoại *' })).toHaveValue('');
    expect(page.getByRole('textbox', { name: 'Căn cước công dân *' })).toHaveValue('');
    expect(page.getByRole('textbox', { name: 'Email *' })).toHaveValue('');
});