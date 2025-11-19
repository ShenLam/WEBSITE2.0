import { test, expect } from '@playwright/test';
import { loadJsonLogSafely } from '../../src/utils/loadJsonLogSafely';

test('LandingPage', async ({ }, testInfo) => {
    const apiLog = loadJsonLogSafely('src/logs/NotifyTSA_NTB.json');
    if (!apiLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLog;
    const expectedUrl = testInfo.project.metadata.Endpoints.NotifyTSA_NTB;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('LeadID');
        expect.soft(Request).toHaveProperty('MARKETING_CAMPAIGN');
        expect.soft(Request).toHaveProperty('CAMPUTM');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.LEAD_NEXTVALID).not.toBe('');
        expect.soft(Request.MARKETING_CAMPAIGN).toBe('LandingPage');
        expect.soft(Request.CAMPUTM).toBe('test_utm_source');
    });
});

test('LandingPage_Skip_Step2', async ({ }, testInfo) => {
    const apiLog = loadJsonLogSafely('src/logs/NotifyTSA_NTB_dropoffskip.json');
    if (!apiLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLog;
    const expectedUrl = testInfo.project.metadata.Endpoints.NotifyTSA_NTB;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('LeadID');
        expect.soft(Request).toHaveProperty('MARKETING_CAMPAIGN');
        expect.soft(Request).toHaveProperty('CAMPUTM');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.LEAD_NEXTVALID).not.toBe('');
        expect.soft(Request.MARKETING_CAMPAIGN).toBe('LandingPage_Skip_Step2');
        expect.soft(Request.CAMPUTM).toBe('test_utm_source');
    });
});

test('LandingPage_Drop-off_Step2  ', async ({ }, testInfo) => {
    const apiLog = loadJsonLogSafely('src/logs/NotifyTSA_NTB_dropoffscheduler.json');
    if (!apiLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLog;
    const expectedUrl = testInfo.project.metadata.Endpoints.NotifyTSA_NTB;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate required request fields', () => {
        expect.soft(Request).toHaveProperty('LeadID');
        expect.soft(Request).toHaveProperty('MARKETING_CAMPAIGN');
        expect.soft(Request).toHaveProperty('CAMPUTM');
    });

    await test.step('✅ Validate field formats', () => {
        expect.soft(Request.LEAD_NEXTVALID).not.toBe('');
        expect.soft(Request.MARKETING_CAMPAIGN).toBe('LandingPage_Drop-off_Step2');
        expect.soft(Request.CAMPUTM).toBe('test_utm_source');
    });
});
