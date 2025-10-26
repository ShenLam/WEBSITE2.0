import { test, expect } from '@playwright/test';
import apiLog from '../../../src/api-log/responsys/register.json';

test('Verify request payload of API: responsys/register', async () => {
    const { Url, Method, Request } = apiLog;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe('https://mkta-int-uat.fecredit.cloud/api/responsys/register');
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('insertOnNoMatch');
        expect.soft(Request).toHaveProperty('updateOnMatch');
        expect.soft(Request).toHaveProperty('matchColumnName1');
        expect.soft(Request).toHaveProperty('matchColumnName2');
        expect.soft(Request).toHaveProperty('data');

        expect.soft(Request.data).toHaveProperty('CUSTOMER_ID_');
        expect.soft(Request.data).toHaveProperty('MOBILE_NUMBER_');
        expect.soft(Request.data).toHaveProperty('EMAIL_ADDRESS_');
        expect.soft(Request.data).toHaveProperty('LEAD_SOURCE');
        expect.soft(Request.data).toHaveProperty('MKT_CAMPAIGN');
        expect.soft(Request.data).toHaveProperty('MKT_FORM');
        expect.soft(Request.data).toHaveProperty('UTM');
        expect.soft(Request.data).toHaveProperty('DATE_OF_BIRTH');
        expect.soft(Request.data).toHaveProperty('CURRENT_ADDRESS');
        expect.soft(Request.data).toHaveProperty('CRMID');
        expect.soft(Request.data).toHaveProperty('NOTIFIED_ID');
        expect.soft(Request.data).toHaveProperty('LEADNEXTVALID');
        expect.soft(Request.data).toHaveProperty('PRODUCT');
        expect.soft(Request.data).toHaveProperty('SALE_CHANNEL');
        expect.soft(Request.data).toHaveProperty('GCLID');
        expect.soft(Request.data).toHaveProperty('WEB_LEADID');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.insertOnNoMatch).toBe(true);
        expect.soft(Request.updateOnMatch).toBe('');
        expect.soft(Request.matchColumnName1).toBe('CUSTOMER_ID_');
        expect.soft(Request.matchColumnName2).toBe('MOBILE_NUMBER_');

        // expect.soft(Request.data).toHaveProperty('CUSTOMER_ID_');
        expect.soft(Request.data.MOBILE_NUMBER_).toMatch(/^X{7}\d{4}$/);   // e.g. XXXXXXX1234
        expect.soft(Request.data.EMAIL_ADDRESS_).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect.soft(Request.data.LEAD_SOURCE).toBe('Website');
        expect.soft(Request.data.MKT_CAMPAIGN).toBe('DMC');
        // expect.soft(Request.data).toHaveProperty('MKT_FORM');
        expect.soft(Request.data.UTM).not.toBe('');
        expect.soft(Request.data.DATE_OF_BIRTH).toBe('');
        expect.soft(Request.data.CURRENT_ADDRESS).toBe('');
        // expect.soft(Request.data).toHaveProperty('CRMID');
        // expect.soft(Request.data).toHaveProperty('NOTIFIED_ID');
        // expect.soft(Request.data).toHaveProperty('LEADNEXTVALID');
        // expect.soft(Request.data).toHaveProperty('PRODUCT');
        // expect.soft(Request.data).toHaveProperty('SALE_CHANNEL');
        // expect.soft(Request.data).toHaveProperty('GCLID');
        expect.soft(Request.data.WEB_LEADID).not.toBe('');
    });
});
