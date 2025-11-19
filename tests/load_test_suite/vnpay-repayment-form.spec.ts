import { expect, test } from '@playwright/test';
import { vnpayTestData } from '../../src/data/vnpayTestData';
import { getCurrentTimeLog } from '../../src/utils/timeUtils';
import { WaitFunction } from '../../src/utils/wait-function';

const { paymentMethod, contractNumber, paymentAmount, bankInfo, vnpayMessage } = vnpayTestData;

Array.from({ length: 1 /* number of times to run the test */ }).forEach((_, index) => {
    test(`VNPAY_LoadTest_01: Verify happy case for VNPAY repayment - #${index + 1}`, async ({ page }) => {
        const waitFunction = new WaitFunction(page);

        await test.step('Access VNPAY form', async () => {
            await page.goto('./thanh-toan-truc-tuyen/');
            await test.step('Wait for page load complete', async () => {
                await waitFunction.pageLoadComplete();
            });
            await page.locator('#repayment-vnpay-tab').click();
            await page.waitForTimeout(500);
        })

        await test.step('Select payment method: THẺ ATM & TÀI KHOẢN NGÂN HÀNG', async () => {
            await page.getByText(paymentMethod.vnpayBank).click();
            await page.waitForTimeout(500);
        })

        await test.step('Fill VNPAY form and submit', async () => {
            // Fill contract number
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).click();
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).fill(contractNumber);
            await page.waitForTimeout(500);
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).press('Enter');

            // Select payment amount
            await page.getByText('Số tiền tối thiểu').first().click();
            await page.waitForTimeout(500);
            await page.getByText('Số tiền khác').click();
            await page.waitForTimeout(500);

            // Fill amount
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).click();
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).fill(paymentAmount);
            await page.waitForTimeout(1000);

            // Submit
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).press('Enter');
            console.log(`[${getCurrentTimeLog()}] Click submit VNPAY form\nContract/Account Number: ${contractNumber} | Payment Amount: ${paymentAmount}`);
            await page.waitForTimeout(500);
        })

        await test.step('Select bank: NCB', async () => {
            await page.getByPlaceholder('Tìm kiếm...').click();
            await page.getByPlaceholder('Tìm kiếm...').fill(bankInfo.bankCode);
            await page.waitForTimeout(500);
            await page.locator('#NCB').click();
        })

        await test.step('Fill bank card details', async () => {
            // Fill Card number
            await page.waitForSelector('div.bank-payement-section');
            await page.locator('input.input-label-change').nth(0).click();
            await page.locator('input.input-label-change').nth(0).fill(bankInfo.cardNumber);
            await page.waitForTimeout(500);

            // Fill Cardholder name
            await page.locator('input.input-label-change').nth(1).click();
            await page.locator('input.input-label-change').nth(1).fill(bankInfo.cardHolder);
            await page.waitForTimeout(500);

            // Fill Issue date
            await page.locator('input.input-label-change').nth(2).click();
            await page.locator('input.input-label-change').nth(2).fill(bankInfo.issueDate);
            await page.waitForTimeout(500);
        })

        await test.step('Continue to confirmation', async () => {
            await page.locator('#btnContinue').click();
            await page.waitForTimeout(500);
            await page.getByRole('link', { name: 'Đồng ý & Tiếp tục' }).click();
            await page.waitForTimeout(500);
        })

        await test.step('Enter OTP', async () => {
            await page.getByPlaceholder('Nhập mã OTP').click();
            await page.getByPlaceholder('Nhập mã OTP').fill(bankInfo.otpCode);
            await page.waitForTimeout(500);
        })

        await test.step('Confirm payment and verify success', async () => {
            await page.getByRole('button', { name: 'Thanh toán' }).click();
            console.log(`[${getCurrentTimeLog()}] Click confirm payment`);

            // Verify success
            await expect(page.locator('.repayment-icon-success')).toBeVisible();
            await expect(page.getByRole('heading', { name: vnpayMessage.successTitle })).toBeVisible();
            await expect(page.getByText(contractNumber)).toBeVisible();
        })
    });

    test(`VNPAY_LoadTest_02: Verify failed case for VNPAY repayment - #${index + 1}`, async ({ page }) => {
        const waitFunction = new WaitFunction(page);

        await test.step('Access VNPAY form', async () => {
            await page.goto('./thanh-toan-truc-tuyen/');
            await test.step('Wait for page load complete', async () => {
                await waitFunction.pageLoadComplete();
            });
            await page.locator('#repayment-vnpay-tab').click();
            await page.waitForTimeout(500);
        })

        await test.step('Select payment method: VÍ ĐIỆN TỬ', async () => {
            await page.getByText(paymentMethod.vnpayMart).click();
            await page.waitForTimeout(500);
        })

        await test.step('Fill VNPAY form and submit', async () => {
            // Fill contract number
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).click();
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).fill(contractNumber);
            await page.waitForTimeout(500);
            await page.getByRole('textbox', { name: 'Số hợp đồng *' }).press('Enter');

            // Select payment amount
            await page.getByText('Số tiền tối thiểu').first().click();
            await page.waitForTimeout(500);
            await page.getByText('Số tiền khác').click();
            await page.waitForTimeout(500);

            // Fill amount
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).click();
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).fill(paymentAmount);
            await page.waitForTimeout(1000);

            // Submit
            await page.getByRole('textbox', { name: 'Số tiền thanh toán *' }).press('Enter');
            console.log(`[${getCurrentTimeLog()}] Click submit VNPAY form\nContract/Account Number: ${contractNumber} | Payment Amount: ${paymentAmount}`);
            await page.waitForTimeout(500);
        })

        await test.step('Cancel payment and verify fail', async () => {
            await page.getByText('Hủy thanh toán').first().click();
            await page.waitForTimeout(500);
            await page.getByText('Xác nhận hủy').first().click();
            console.log(`[${getCurrentTimeLog()}] Click cancel payment`);

            // Verify fail
            await expect(page.locator('.repayment-icon-fail')).toBeVisible();
            await expect(page.getByRole('heading', { name: vnpayMessage.failureTitle })).toBeVisible();
            await expect(page.getByText(vnpayMessage.failureDesc)).toBeVisible();
        })
    });
});