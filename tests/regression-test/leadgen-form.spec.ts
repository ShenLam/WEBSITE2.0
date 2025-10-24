import { expect, test } from '@playwright/test';
import { generateRandomNID, generateRandomPhone } from '../../src/utils/dataGenerator';
import { leadGenTestData } from '../../src/data/leadGenTestData';
import { getCurrentTimeLog } from '../../src/utils/timeUtils';

let nid: string = generateRandomNID();
let phone: string = generateRandomPhone();
const { fullName, email, oldNID, goodBrand, location, message } = leadGenTestData;

test.skip(`Verify drop-off scheduler with PL product allocated to vTiger`, async ({ page }) => {

});

test.skip(`Verify age validation logic`, async ({ page }) => {

});

test.skip(`Verify fraud prevention mechanism`, async ({ page }) => {

});

test.only(`Verify duplication prevention`, async ({ page }) => {
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

    await test.step('Skip step #2 and verify success', async () => {
        await expect(page.locator('h6.c4-heading')).toBeVisible()
        await page.getByRole('link', { name: 'Bỏ qua' }).click();

        // Verify success
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc_1)).toBeVisible();
    })

    await test.step('Access LeadGen form again', async () => {
        await page.reload();
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

        await page.pause();
    })
});

test.skip(`Verify failed pre-qualification case`, async ({ page }) => {

});

test(`Verify happy case with PL product allocated to vTiger`, async ({ page }) => {
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
        await expect(page.locator('h6.c4-heading')).toBeVisible()
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
        await expect(page.locator('h6.c3-heading').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc)).toBeVisible();
    })
});

test.skip(`Verify skip step #1 with PL product allocated to vTiger`, async ({ page }) => {

});

test.skip(`Verify skip step #2 with PL product allocated to vTiger`, async ({ page }) => {

});

test(`Verify happy case with PL product allocated to iSale`, async ({ page }) => {
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
        await expect(page.locator('h6.c4-heading')).toBeVisible()
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
        await expect(page.locator('h6.c3-heading').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc)).toBeVisible();
    })
});

test(`Verify happy case with CRC product allocated to iSale`, async ({ page }) => {
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
        await expect(page.locator('h6.c4-heading')).toBeVisible()
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

        // Verify success
        await expect(page.locator('h6.c3-heading').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc)).toBeVisible();
    })
});

test(`Verify happy case with TWL product allocated to iSale`, async ({ page }) => {
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
        await expect(page.locator('h6.c4-heading')).toBeVisible()
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
        await expect(page.locator('h6.c3-heading').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc)).toBeVisible();
    })
});

test(`Verify happy case with CDL product allocated to iSale`, async ({ page }) => {
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
        await expect(page.locator('h6.c4-heading')).toBeVisible()
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
        await expect(page.locator('h6.c3-heading').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible();
        await expect(page.getByText(message.successDesc)).toBeVisible();
    })
});

test.skip(`Verify PL product notification to XSTU`, async ({ page }) => {

});

test.skip(`Verify PL product notification to NTB`, async ({ page }) => {

});
