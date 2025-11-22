import { test, expect, Page } from '@playwright/test';

test('Update recaptcha score for Contact us form', async ({ page }) => {
    await loginBO(page)

    await page.goto('https://admin-web-uat.fecredit.cloud/umbraco#/forms/Form/edit/c32395ff-1280-4730-81ef-06a34a180c1f?mculture=vi-VN');
    await expect(page.getByText('Contact Us Form', { exact: true })).toBeVisible();
    await page.locator('div:nth-child(5) > .umb-forms__field-content > .umb-forms__actions > a').click();

    await setRecaptcha(page, 0.1);
});

async function loginBO(page: Page) {
    await page.goto('https://admin-web-uat.fecredit.cloud/umbraco/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@example.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    await expect(page.getByText('Forms', { exact: true })).toBeVisible();
}

async function setRecaptcha(page: Page, score: number) {
    await page.getByText(`${score}`, { exact: true }).first().click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText("Form saved")).toBeVisible();
}