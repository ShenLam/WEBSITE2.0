import { expect, test } from '@playwright/test';
import { generateRandomNID, generateRandomPhone } from '../../../../src/utils/dataGenerator';
import { leadGenTestData } from '../../../../src/data/leadGenTestData';
import { getCurrentTimeLog } from '../../../../src/utils/timeUtils';
import { WaitFunction } from '../../../../src/utils/wait-function';

const { fullName, message, nidSmallThan21, nidBiggerThan59, failedQualification } = leadGenTestData;

test(`TC_LAF25: Verify failed pre-qualification case`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);
    const nid: string = generateRandomNID();
    const phone: string = generateRandomPhone();

    await test.step('Access LeadGen form', async () => {
        await page.goto('./');
        await page.waitForLoadState('domcontentloaded');
    })

    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await test.step('Fill LeadGen form step #1 and submit', async () => {
        // Fill full name
        await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
        await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
        await page.waitForTimeout(500);

        // Fill NID
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(failedQualification.nid);
        await page.waitForTimeout(500);

        // Fill phone number
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(failedQualification.phone);
        await page.waitForTimeout(500);

        // Submit
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
    })

    await test.step('Verify failed pre-qualification', async () => {
        await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible();
        await expect(page.getByRole('heading', { name: message.failureTitle })).toBeVisible();
        await expect(page.getByText(message.step1.failureDesc)).toBeVisible();
        await expect(page.locator('div.lead-gen-main-container').getByText('Thử lại').nth(1)).toBeVisible();
    })
});

test(`TC_LAF30: Verify failed age validation rule on website`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);
    const nid: string = generateRandomNID();
    const phone: string = generateRandomPhone();

    await test.step('Access LeadGen form', async () => {
        await page.goto('./');
        await page.waitForLoadState('domcontentloaded');
    })

    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await test.step('Fill NID < 21 on LeadGen form and submit', async () => {
        // Fill full name
        await page.getByRole('textbox', { name: 'Họ và tên *' }).click();
        await page.getByRole('textbox', { name: 'Họ và tên *' }).fill(fullName);
        await page.waitForTimeout(500);

        // Fill NID < 18
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nidSmallThan21);
        await page.waitForTimeout(500);

        // Fill phone number
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
        await page.waitForTimeout(500);

        // Submit
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
    })

    await test.step('Verify age validation fail', async () => {
        await expect(page.getByText(message.step1.failureDesc).first()).toBeVisible()
    })

    await test.step('Fill NID > 59 on LeadGen form and submit', async () => {
        // Fill NID > 60
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill(nidBiggerThan59);
        await page.waitForTimeout(500);

        // Submit
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
    })

    await test.step('Verify age validation fail', async () => {
        await expect(page.getByText(message.step1.failureDesc).first()).toBeVisible()
    })
});

test(`TC_LAF31: Verify failed duplication prevention rule`, async ({ page }) => {
    const waitFunction = new WaitFunction(page);
    const nid: string = generateRandomNID();
    const phone: string = generateRandomPhone();

    await test.step('Access LeadGen form', async () => {
        await page.goto('./');
        await page.waitForLoadState('domcontentloaded');
    })

    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

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

    await test.step('Verify success step #1', async () => {
        await expect(page.getByRole('img', { name: 'img-card' })).toBeVisible()
        await expect(page.getByRole('heading', { name: message.successTitle })).toBeVisible()
        await expect(page.getByText(message.step1.successDesc)).toBeVisible()
        await expect(page.getByText(message.step1.successDesc_1)).toBeVisible()
    })

    await test.step('Close form and navigate to homepage', async () => {
        await page.getByRole('link', { name: 'FE CREDIT', exact: true }).click();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.waitForTimeout(500);
    })

    await test.step('Wait for page load complete', async () => {
        await waitFunction.pageLoadComplete();
    });

    await test.step('Fill LeadGen form with previous NID and submit', async () => {
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
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill('0938355888');
        await page.waitForTimeout(500);

        // Submit
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
    })

    await test.step('Verify duplication prevention fail', async () => {
        await expect(page.getByText(message.step1.failureDesc_1)).toBeVisible()
    })

    await test.step('Fill LeadGen form with previous Phone and submit', async () => {
        // Fill NID
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).click();
        await page.getByRole('textbox', { name: 'Số căn cước công dân *' }).fill('079200012345');
        await page.waitForTimeout(500);

        // Fill phone number
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).click();
        await page.getByRole('textbox', { name: 'Số điện thoại *' }).fill(phone);
        await page.waitForTimeout(500);

        // Submit
        await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
        console.log(`[${getCurrentTimeLog()}] Click submit LeadGen form step #1\nNational ID: ${nid} | Phone Number: ${phone}`);
    })

    await test.step('Verify duplication prevention fail', async () => {
        await expect(page.getByText(message.step1.failureDesc_1)).toBeVisible()
    })
});