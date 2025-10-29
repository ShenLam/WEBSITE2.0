import { expect, test } from '@playwright/test';
import { vnpayTestData } from '../src/data/vnpayTestData';
import { getCurrentTimeLog } from '../src/utils/timeUtils';
import { generateRandomNID, generateRandomPhone } from '../src/utils/dataGenerator';
import { leadGenTestData } from '../src/data/leadGenTestData';

const { fullName, email, oldNID, goodBrand, location, message } = leadGenTestData;
const { paymentMethod, contractNumber, paymentAmount, bankInfo, vnpayMessage } = vnpayTestData;

// Load test for LeadGen form
Array.from({ length: 1 /* number of times to run the test */ }).forEach((_, index) => {
    test(`LeadGen_LoadTest_01: Verify happy case with PL product allocated to vTiger - #${index + 1}`, async ({ page }) => {
        const nid: string = generateRandomNID();
        const phone: string = generateRandomPhone();

        await test.step('Access LeadGen form', async () => {
            await page.goto('./');
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step('Fill LeadGen form step #1 and submit', async () => {
            // Fill full name
            await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
            await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
            await page.waitForTimeout(500);

            // Fill NID
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nid);
            await page.waitForTimeout(500);

            // Fill phone number
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
            await page.waitForTimeout(500);

            // Submit
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
        })

        await test.step('Continue to step #2', async () => {
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
            await expect(page.getByText(message.step1.successDesc)).toBeVisible()
            await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
            await page.getByRole('link', { name: 'Tiếp tục' }).click();
            await page.waitForLoadState('load');
        })

        await test.step('Fill Email & Old National ID', async () => {
            // Fill email
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(500);

            // Fill old NID
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).click();
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).fill(oldNID);
            await page.waitForTimeout(500);
        })

        await test.step('Submit step #2 and verify success', async () => {
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit step #2`);

            // Verify success
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
            await expect(page.getByText(message.step2.successDesc)).toBeVisible();
        })
    });

    test(`LeadGen_LoadTest_02: Verify happy case with PL product allocated to iSale - #${index + 1}`, async ({ page }) => {
        const nid: string = generateRandomNID();
        const phone: string = generateRandomPhone();

        await test.step('Access LeadGen form', async () => {
            await page.goto('./');
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step('Fill LeadGen form step #1 and submit', async () => {
            // Fill full name
            await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
            await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
            await page.waitForTimeout(500);

            // Fill NID
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nid);
            await page.waitForTimeout(500);

            // Fill phone number
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
            await page.waitForTimeout(500);

            // Submit
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
        })

        await test.step('Continue to step #2', async () => {
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
            await expect(page.getByText(message.step1.successDesc)).toBeVisible()
            await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
            await page.getByRole('link', { name: 'Tiếp tục' }).click();
        })

        await test.step('Fill Email & Old National ID', async () => {
            // Fill email
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(500);

            // Fill old NID
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).click();
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).fill(oldNID);
            await page.waitForTimeout(500);
        })

        await test.step('Select sale channel: TƯ VẤN TRỰC TIẾP', async () => {
            await page.getByText('TƯ VẤN TRỰC TIẾP').click();
            await page.waitForTimeout(500);
        })

        await test.step('Select province: Thành phố Hồ Chí Minh & district: Quận 1', async () => {
            await page.getByLabel('Tỉnh/ Thành phố *').selectOption(location.provinceCode);
            await page.waitForTimeout(500);
            await page.getByLabel('Quận/ Huyện *').selectOption(location.districtCode);
            await page.waitForTimeout(1000);
        })

        await test.step('Submit step #2 and verify success', async () => {
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit step #2`);

            // Verify success
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
            await expect(page.getByText(message.step2.successDesc)).toBeVisible();
        })
    });

    test(`LeadGen_LoadTest_03: Verify happy case with CRC product allocated to iSale - #${index + 1}`, async ({ page }) => {
        const nid: string = generateRandomNID();
        const phone: string = generateRandomPhone();

        await test.step('Access LeadGen form', async () => {
            await page.goto('./');
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step('Fill LeadGen form step #1 and submit', async () => {
            // Fill full name
            await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
            await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
            await page.waitForTimeout(500);

            // Fill NID
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nid);
            await page.waitForTimeout(500);

            // Fill phone number
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
            await page.waitForTimeout(500);

            // Submit
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
        })

        await test.step('Continue to step #2', async () => {
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
            await expect(page.getByText(message.step1.successDesc)).toBeVisible()
            await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
            await page.getByRole('link', { name: 'Tiếp tục' }).click();
        })

        await test.step('Select product: THẺ TÍN DỤNG', async () => {
            await page.getByText('THẺ TÍN DỤNG', { exact: true }).click();
            await page.waitForTimeout(1000);
        })

        await test.step('Fill Email & Old National ID', async () => {
            // Fill email
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(500);

            // Fill old NID
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).click();
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).fill(oldNID);
            await page.waitForTimeout(500);
        })

        await test.step('Select sale channel: TƯ VẤN TRỰC TIẾP', async () => {
            await page.getByText('TƯ VẤN TRỰC TIẾP').click();
            await page.waitForTimeout(500);
        })

        await test.step('Select province: Thành phố Hồ Chí Minh & district: Quận 1', async () => {
            await page.getByLabel('Tỉnh/ Thành phố *').selectOption(location.provinceCode);
            await page.waitForTimeout(500);
            await page.getByLabel('Quận/ Huyện *').selectOption(location.districtCode);
            await page.waitForTimeout(1000);
        })

        await test.step('Submit step #2 and verify success', async () => {
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit step #2`);

            // Verify success
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
            await expect(page.getByText(message.step2.successDesc)).toBeVisible();
        })
    });

    test(`LeadGen_LoadTest_04: Verify happy case with TWL product allocated to iSale - #${index + 1}`, async ({ page }) => {
        const nid: string = generateRandomNID();
        const phone: string = generateRandomPhone();

        await test.step('Access LeadGen form', async () => {
            await page.goto('./');
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step('Fill LeadGen form step #1 and submit', async () => {
            // Fill full name
            await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
            await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
            await page.waitForTimeout(500);

            // Fill NID
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nid);
            await page.waitForTimeout(500);

            // Fill phone number
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
            await page.waitForTimeout(500);

            // Submit
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
        })

        await test.step('Continue to step #2', async () => {
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
            await expect(page.getByText(message.step1.successDesc)).toBeVisible()
            await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
            await page.getByRole('link', { name: 'Tiếp tục' }).click();
        })

        await test.step('Select product: VAY MUA XE MÁY', async () => {
            await page.getByText('VAY MUA XE MÁY', { exact: true }).click();
            await page.waitForTimeout(1000);
        })

        await test.step('Fill Email & Old National ID & Good Brand', async () => {
            // Fill email
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(500);

            // Fill old NID
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).click();
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).fill(oldNID);
            await page.waitForTimeout(500);

            // Select good brand
            await page.getByText('VAY MUA XE MÁY', { exact: true }).click();
            await page.locator('select[name="\\35 4797379-0e2e-45bb-80a4-3ef4fe546480"]').selectOption(goodBrand.twl.yamaha);
            await page.waitForTimeout(500);
        })

        await test.step('Select province: Thành phố Hồ Chí Minh & district: Quận 1', async () => {
            await page.getByLabel('Tỉnh/ Thành phố *').selectOption(location.provinceCode);
            await page.waitForTimeout(500);
            await page.getByLabel('Quận/ Huyện *').selectOption(location.districtCode);
            await page.waitForTimeout(1000);
        })

        await test.step('Submit step #2 and verify success', async () => {
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit step #2`);

            // Verify success
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
            await expect(page.getByText(message.step2.successDesc)).toBeVisible();
        })
    });

    test(`LeadGen_LoadTest_05: Verify happy case with CDL product allocated to iSale - #${index + 1}`, async ({ page }) => {
        const nid: string = generateRandomNID();
        const phone: string = generateRandomPhone();

        await test.step('Access LeadGen form', async () => {
            await page.goto('./');
            await page.waitForLoadState('domcontentloaded');
        })

        await test.step('Fill LeadGen form step #1 and submit', async () => {
            // Fill full name
            await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
            await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
            await page.waitForTimeout(500);

            // Fill NID
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
            await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nid);
            await page.waitForTimeout(500);

            // Fill phone number
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
            await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
            await page.waitForTimeout(500);

            // Submit
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
        })

        await test.step('Continue to step #2', async () => {
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
            await expect(page.getByText(message.step1.successDesc)).toBeVisible()
            await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
            await page.getByRole('link', { name: 'Tiếp tục' }).click();
        })

        await test.step('Select product: VAY MUA ĐIỆN THOẠI-ĐIỆN MÁY', async () => {
            await page.getByText('VAY MUA ĐIỆN THOẠI-ĐIỆN MÁY', { exact: true }).click();
            await page.waitForTimeout(1000);
        })

        await test.step('Fill Email & Old National ID & Good Brand', async () => {
            // Fill email
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill(email);
            await page.waitForTimeout(500);

            // Fill old NID
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).click();
            await page.getByRole('textbox', { name: 'CCCD/CMT cũ' }).fill(oldNID);
            await page.waitForTimeout(500);

            // Fill good brand
            await page.getByRole('textbox', { name: 'Sản phẩm định mua' }).click();
            await page.getByRole('textbox', { name: 'Sản phẩm định mua' }).fill(goodBrand.cdl);
            await page.waitForTimeout(500);
        })

        await test.step('Select province: Thành phố Hồ Chí Minh & district: Quận 1', async () => {
            await page.getByLabel('Tỉnh/ Thành phố *').selectOption(location.provinceCode);
            await page.waitForTimeout(500);
            await page.getByLabel('Quận/ Huyện *').selectOption(location.districtCode);
            await page.waitForTimeout(1000);
        })

        await test.step('Submit step #2 and verify success', async () => {
            await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
            console.log(`[${getCurrentTimeLog()}] Click submit step #2`);

            // Verify success
            await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
            await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
            await expect(page.getByText(message.step2.successDesc)).toBeVisible();
        })
    });
});

// Load test for VNPAY form
Array.from({ length: 1 /* number of times to run the test */ }).forEach((_, index) => {
    test(`VNPAY_LoadTest_01: Verify happy case for VNPAY repayment - #${index + 1}`, async ({ page }) => {
        await test.step('Access VNPAY form', async () => {
            await page.goto('./thanh-toan-truc-tuyen/');
            await page.waitForLoadState('domcontentloaded');
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
        await test.step('Access VNPAY form', async () => {
            await page.goto('./thanh-toan-truc-tuyen/');
            await page.waitForLoadState('domcontentloaded');
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