import { test, expect } from '@playwright/test';
import { loadJsonLogSafely } from '../../../../src/utils/loadJsonLogSafely';

test('Verify request payload of API: do-not-bother/create-info (condition: has email)', async ({ }, testInfo) => {
    const apiLogWithEmail = loadJsonLogSafely('src/logs/do-not-bother/create-info-with-email.json');
    if (!apiLogWithEmail) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLogWithEmail;
    const types = ['PHONE', 'SMS', 'EMAIL'];
    const expectedUrl = testInfo.project.metadata.Endpoints.do_not_bother.create_info;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate request structure', () => {
        expect.soft(Request).toHaveProperty('request');
        expect.soft(Request).toHaveProperty('headers');
        expect.soft(Request.request.length).toBe(3);
    });

    await test.step('✅ Validate request items', async () => {
        for (const type of types) {
            const item = Request.request.find((i: { type: string; }) => i.type === type);
            expect.soft(item).toBeTruthy(); // Ensure item exists

            await test.step('✅ Validate required request fields', () => {
                expect.soft(item).toHaveProperty('nid');
                expect.soft(item).toHaveProperty('full_name');
                expect.soft(item).toHaveProperty('type_value');
                expect.soft(item).toHaveProperty('type');
                expect.soft(item).toHaveProperty('do_not_bother');
                expect.soft(item).toHaveProperty('reason');
            });

            await test.step('✅ Validate field formats', () => {
                expect.soft(item?.nid).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
                expect.soft(item?.full_name).not.toBe('');
                expect.soft(item?.type).toBe(type);
                if (type === 'EMAIL') {
                    expect.soft(item?.type_value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                } else {
                    expect.soft(item?.type_value).toMatch(/^X{7}\d{4}$/); // e.g., XXXXXXX1234
                }
                expect.soft(item?.do_not_bother).toBe(false);
                expect.soft(item?.reason).toBe('Customer sign-up to receive advertising');
            });
        };
    });

    await test.step('✅ Validate request headers', async () => {
        await test.step('✅ Validate required request fields', () => {
            expect.soft(Request.headers).toHaveProperty('trans_id');
            expect.soft(Request.headers).toHaveProperty('source');
        });

        await test.step('✅ Validate field formats', () => {
            expect.soft(Request.headers.trans_id).not.toBe('');
            expect.soft(Request.headers.source).toBe('FEC_LandingPage');
        });
    });
});

test('Verify request payload of API: do-not-bother/create-info (condition: without email)', async ({ }, testInfo) => {
    const apiLogWithoutEmail = loadJsonLogSafely('src/logs/do-not-bother/create-info-without-email.json');
    if (!apiLogWithoutEmail) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const { Url, Method, Request } = apiLogWithoutEmail;
    const types = ['PHONE', 'SMS'];
    const expectedUrl = testInfo.project.metadata.Endpoints.do_not_bother.create_info;

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
        expect.soft(Method).toBe('POST');
    });

    await test.step('✅ Validate request structure', () => {
        expect.soft(Request).toHaveProperty('request');
        expect.soft(Request).toHaveProperty('headers');
        expect.soft(Request.request.length).toBe(2);
    });

    await test.step('✅ Validate request items', async () => {
        for (const type of types) {
            const item = Request.request.find((i: { type: string; }) => i.type === type);
            expect.soft(item).toBeTruthy(); // Ensure item exists

            await test.step('✅ Validate required request fields', () => {
                expect.soft(item).toHaveProperty('nid');
                expect.soft(item).toHaveProperty('full_name');
                expect.soft(item).toHaveProperty('type_value');
                expect.soft(item).toHaveProperty('type');
                expect.soft(item).toHaveProperty('do_not_bother');
                expect.soft(item).toHaveProperty('reason');
            });

            await test.step('✅ Validate field formats', () => {
                expect.soft(item?.nid).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
                expect.soft(item?.full_name).not.toBe('');
                expect.soft(item?.type).toBe(type);
                expect.soft(item?.type_value).toMatch(/^X{7}\d{4}$/); // e.g., XXXXXXX1234
                expect.soft(item?.do_not_bother).toBe(false);
                expect.soft(item?.reason).toBe('Customer sign-up to receive advertising');
            });
        }
    });

    await test.step('✅ Validate request headers', async () => {
        await test.step('✅ Validate required request fields', () => {
            expect.soft(Request.headers).toHaveProperty('trans_id');
            expect.soft(Request.headers).toHaveProperty('source');
        });

        await test.step('✅ Validate field formats', () => {
            expect.soft(Request.headers.trans_id).not.toBe('');
            expect.soft(Request.headers.source).toBe('FEC_LandingPage');
        });
    });
});
