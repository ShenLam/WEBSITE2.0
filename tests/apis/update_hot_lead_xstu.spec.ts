import { test, expect } from '@playwright/test';
import apiLog from '../../src/api-log/update_hot_lead_xstu.json';

test('Verify request payload of API: update_hot_lead_xstu', async () => {
    const { Url, Method, Request } = apiLog;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe('https://fecredit-uat.od1.vtiger.ws/restapi/v1/customizer/api/update_hot_lead_xstu');
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('ID_CARD_NUMBER');
        expect.soft(Request).toHaveProperty('PHONE_NUMBER');
        expect.soft(Request).toHaveProperty('LEAD_NEXTVALID');
        expect.soft(Request).toHaveProperty('MARKETING_CHANNEL');
        expect.soft(Request).toHaveProperty('CAMPUTM');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.ID_CARD_NUMBER).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
        expect.soft(Request.PHONE_NUMBER).toMatch(/^X{7}\d{4}$/);   // e.g. XXXXXXX1234
        expect.soft(Request.LEAD_NEXTVALID).not.toBe('');
        expect.soft(Request.MARKETING_CHANNEL).toBe('Landing Page');
        expect.soft(Request.CAMPUTM).not.toBe('');
    });
});
