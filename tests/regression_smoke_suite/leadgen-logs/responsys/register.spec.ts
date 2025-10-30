import { test, expect } from '@playwright/test';
import { loadJsonLogSafely } from '../../../../src/utils/loadJsonLogSafely';

test(`Verify request payload of API: responsys/register (condition: Home form, PL product, Not in EB, have UTM & GG param)`, async ({ }, testInfo) => {
    const apiLogWithGGParam = loadJsonLogSafely('src/logs/responsys/register-with-gg-param.json');
    if (!apiLogWithGGParam) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLogWithGGParam;
    const expectedUrl = testInfo.project.metadata.Endpoints.responsys.register;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
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

        expect.soft(Request.data.CUSTOMER_ID_).toMatch(/^[A-Za-z0-9+/]{43}=$/); // Encrypted SHA256 Base64 from National ID field
        expect.soft(Request.data.MOBILE_NUMBER_).toMatch(/^X{7}\d{4}$/);   // e.g. XXXXXXX1234
        expect.soft(Request.data.EMAIL_ADDRESS_).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect.soft(Request.data.LEAD_SOURCE).toBe('Website');
        expect.soft(Request.data.MKT_CAMPAIGN).toBe('DMC');
        expect.soft(Request.data.MKT_FORM).toBe('HOME');
        expect.soft(Request.data.UTM).toBe('test_utm_source');
        expect.soft(Request.data.DATE_OF_BIRTH).toBe('');
        expect.soft(Request.data.CURRENT_ADDRESS).toBe('');
        expect.soft(Request.data.CRMID).not.toBe('');
        expect.soft(Request.data.NOTIFIED_ID).toBe('');
        expect.soft(Request.data.LEADNEXTVALID).toBe('');
        expect.soft(Request.data.PRODUCT).toBe('PLNTB');
        expect.soft(Request.data.SALE_CHANNEL).toBe('TSA');
        expect.soft(Request.data.GCLID).toContain('GG:test_gclid');
        expect.soft(Request.data.WEB_LEADID).not.toBe('');
    });
});

test(`Verify request payload of API: responsys/register (condition: PL form, PL product, In EB, have UTM & FB param)`, async ({ }, testInfo) => {
    const apiLogWithFBParam = loadJsonLogSafely('src/logs/responsys/register-with-fb-param.json');
    if (!apiLogWithFBParam) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLogWithFBParam;
    const expectedUrl = testInfo.project.metadata.Endpoints.responsys.register;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
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

        expect.soft(Request.data.CUSTOMER_ID_).toMatch(/^[A-Za-z0-9+/]{43}=$/); // Encrypted SHA256 Base64 from National ID field
        expect.soft(Request.data.MOBILE_NUMBER_).toMatch(/^X{7}\d{4}$/);   // e.g. XXXXXXX1234
        expect.soft(Request.data.EMAIL_ADDRESS_).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect.soft(Request.data.LEAD_SOURCE).toBe('Website');
        expect.soft(Request.data.MKT_CAMPAIGN).toBe('DMC');
        expect.soft(Request.data.MKT_FORM).toBe('PL');
        expect.soft(Request.data.UTM).toBe('test_utm_source');
        expect.soft(Request.data.DATE_OF_BIRTH).toBe('');
        expect.soft(Request.data.CURRENT_ADDRESS).toBe('');
        expect.soft(Request.data.CRMID).toBe('');
        expect.soft(Request.data.NOTIFIED_ID).not.toBe('');
        expect.soft(Request.data.LEADNEXTVALID).not.toBe('');
        expect.soft(Request.data.PRODUCT).toBe('PLXSTU');
        expect.soft(Request.data.SALE_CHANNEL).toBe('TSA');
        expect.soft(Request.data.GCLID).toContain('FB:test_fbclid');
        expect.soft(Request.data.WEB_LEADID).not.toBe('');
    });
});
