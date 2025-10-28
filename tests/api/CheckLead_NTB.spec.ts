import { test, expect } from '@playwright/test';
import apiLog from '../../src/api-log/CheckLead_NTB.json';

const expectedUrl: string = 'https://fecredit-uat.od1.vtiger.ws/restapi/v1/customizer/api/CheckLead_NTB'; // UAT env
// const expectedUrl: string = 'https://fecredit-apis.od2.vtiger.com/restapi/v1/customizer/api/CheckLead_NTB'; // PROD env

test('Verify request payload of API: CheckLead_NTB', async () => {
    const { Url, Method, Request } = apiLog;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('NationalID');
        expect.soft(Request).toHaveProperty('PhoneNumber');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.NationalID).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
        expect.soft(Request.PhoneNumber).toMatch(/^X{6}\d{4}$/);   // e.g. XXXXXX1234
    });
});
