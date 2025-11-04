import { test, expect } from '@playwright/test';
import { loadJsonLogSafely } from '../../../../src/utils/loadJsonLogSafely';

test('Verify request payload of API: XSTU_Check_Eligible', async ({ }, testInfo) => {
    const apiLog = loadJsonLogSafely('src/logs/XSTU_Check_Eligible.json');
    if (!apiLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLog;
    const expectedUrl = testInfo.project.metadata.Endpoints.XSTU_Check_Eligible;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('ID_CARD_NUMBER');
        expect.soft(Request).toHaveProperty('PHONE_NUMBER');
        expect.soft(Request).toHaveProperty('MKT_CAMPAIGNS');
        expect.soft(Request).toHaveProperty('ORIGINAL_PRODUCT');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.ID_CARD_NUMBER).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
        expect.soft(Request.PHONE_NUMBER).toMatch(/^X{7}\d{4}$/);   // e.g. XXXXXXX1234
        expect.soft(Request.MKT_CAMPAIGNS).toBe('DMC');
        expect.soft(Request.ORIGINAL_PRODUCT).toBe('');
    });
});
