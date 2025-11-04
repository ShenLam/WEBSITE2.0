import { test, expect } from '@playwright/test';
import { loadJsonLogSafely } from '../../../../src/utils/loadJsonLogSafely';

test('Verify age validation rule on website', async ({ }, testInfo) => {
    const ageLog = loadJsonLogSafely('src/logs/leadgen-rules/pass-age-validation.json');
    if (!ageLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const acquisitionSettings = testInfo.project.metadata.AcquisitionSettings;
    const { sourceIP, user, action, status, information } = ageLog;
    const match = information.match(/^NID:\s(X{8}\d{4})\s-\sPhone:\s(X{6}\d{4})\s-\sAge:\s(\d{1,2})$/);
    const [, nid, phone, ageStr] = match || [];
    const age = Number(ageStr);

    await test.step('✅ Validate sourceIP, user, action, status', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Age validation');
        expect.soft(status).toBe(`Age validation: Passed - Allowed range [${acquisitionSettings.MinAge}, ${acquisitionSettings.MaxAge}]`);
    });

    await test.step('✅ Validate required request fields in information log', () => {
        expect(match, `Format mismatch: "${information}"`).not.toBeNull()
    });

    await test.step('✅ Validate field formats in information log', () => {
        if (match) {
            expect.soft(nid, `Invalid NID format: ${nid}`).toMatch(/^X{8}\d{4}$/);
            expect.soft(phone, `Invalid phone format: ${phone}`).toMatch(/^X{6}\d{4}$/);
            expect.soft(age >= 21 && age <= 59, `Age out of range: ${age}`).toBeTruthy();
        };
    });
});

test('Verify fraud prevention rule (IP rate limit) on website', async ({ }, testInfo) => {
    const fraudLog = loadJsonLogSafely('src/logs/leadgen-rules/pass-fraud-prevention.json');
    if (!fraudLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const acquisitionSettings = testInfo.project.metadata.AcquisitionSettings;
    const { sourceIP, user, action, status, information } = fraudLog;
    const statusMatch = status.match(/^Fraud prevention: Passed - (\d+)\/(\d+) submissions in last (\d+(\.\d+)?)h$/);
    const infoMatch = information.match(/^NID:\s(X{8}\d{4})\s-\sPhone:\s(X{6}\d{4})\s-\sSubmissions:\s(\d+)\s+in\s+last\s+(\d+(\.\d+)?)h$/);
    const [, submittedStr, limitStr, hourStr] = statusMatch || [];
    const [, nid, phone, submissionsStr, infoHourStr] = infoMatch || [];
    const submitted = Number(submittedStr);
    const limit = Number(limitStr);
    const statusHours = Number(hourStr);
    const submissions = Number(submissionsStr);
    const infoHours = Number(infoHourStr);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Fraud prevention - IP rate limit');
    });

    await test.step('✅ Validate required request fields in status & information log', () => {
        expect.soft(statusMatch, `Format mismatch in status: "${status}"`).not.toBeNull();
        expect.soft(infoMatch, `Format mismatch in information: "${information}"`).not.toBeNull();
    });

    await test.step('✅ Validate field values in status & information log', () => {
        if (statusMatch) {
            expect.soft(submitted).toBeLessThanOrEqual(acquisitionSettings.IpRequestLimitPerInterval)
            expect.soft(limit).toBe(acquisitionSettings.IpRequestLimitPerInterval);
            expect.soft(statusHours).toBe(acquisitionSettings.IgnoreLeadSubmit);
        }

        if (infoMatch) {
            expect.soft(nid, `Invalid NID format: ${nid}`).toMatch(/^X{8}\d{4}$/);
            expect.soft(phone, `Invalid phone format: ${phone}`).toMatch(/^X{6}\d{4}$/);
            expect.soft(submissions === submitted, `Submissions mismatch: status=${submitted}, info=${submissions}`).toBeTruthy();
            expect.soft(infoHours).toBe(statusHours);
        }
    });
});

test('Verify duplication prevention rule (NID & Phone check) on website', async ({ }, testInfo) => {
    const duplicationLog = loadJsonLogSafely('src/logs/leadgen-rules/pass-duplication-prevention.json');
    if (!duplicationLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const acquisitionSettings = testInfo.project.metadata.AcquisitionSettings;
    const { sourceIP, user, action, status, information } = duplicationLog;
    const statusMatch = status.match(/^Duplication prevention: Passed - No record found in last (\d+(\.\d+)?)h$/);
    const infoMatch = information.match(/^NID:\s(X{8}\d{4})\s-\sPhone:\s(X{6}\d{4})\s-\sSubmission:\sNo duplicate within (\d+(\.\d+)?)h$/);
    const [, statusHoursStr] = statusMatch || [];
    const [, nid, phone, infoHoursStr] = infoMatch || [];
    const statusHours = Number(statusHoursStr);
    const infoHours = Number(infoHoursStr);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Duplication prevention - NID & Phone check');
    });

    await test.step('✅ Validate required request fields in status & information log', () => {
        expect.soft(statusMatch, `Format mismatch in status: "${status}"`).not.toBeNull();
        expect.soft(infoMatch, `Format mismatch in information: "${information}"`).not.toBeNull();
    });

    await test.step('✅ Validate field values in status & information log', () => {
        if (statusMatch) {
            expect.soft(statusHours).toBe(acquisitionSettings.IgnoreLeadSubmit);
        }

        if (infoMatch) {
            expect.soft(nid, `Invalid NID format: ${nid}`).toMatch(/^X{8}\d{4}$/);
            expect.soft(phone, `Invalid phone format: ${phone}`).toMatch(/^X{6}\d{4}$/);
            expect.soft(infoHours).toBe(statusHours);
        }
    });
});

test('Verify duplication prevention rule (NID & Phone check) on website when duplicate NID record exists', async ({ }, testInfo) => {
    const duplicationNIDLog = loadJsonLogSafely('src/logs/leadgen-rules/fail-duplication-prevention-nid.json');
    if (!duplicationNIDLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const acquisitionSettings = testInfo.project.metadata.AcquisitionSettings;
    const { sourceIP, user, action, status, information } = duplicationNIDLog;
    const statusMatch = status.match(/^Duplication prevention: Failed - Lead exists in DB within (\d+(\.\d+)?)h$/);
    const infoMatch = information.match(/^NID:\s(X{8}\d{4})\s-\sPhone:\s(X{6}\d{4})\s-\sSubmission:\sNID duplicate within (\d+(\.\d+)?)h$/);
    const [, statusHoursStr] = statusMatch || [];
    const [, nid, phone, infoHoursStr] = infoMatch || [];
    const statusHours = Number(statusHoursStr);
    const infoHours = Number(infoHoursStr);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Duplication prevention - NID & Phone check');
    });

    await test.step('✅ Validate required request fields in status & information log', () => {
        expect.soft(statusMatch, `Format mismatch in status: "${status}"`).not.toBeNull();
        expect.soft(infoMatch, `Format mismatch in information: "${information}"`).not.toBeNull();
    });

    await test.step('✅ Validate field values in status & information log', () => {
        if (statusMatch) {
            expect.soft(statusHours).toBe(acquisitionSettings.IgnoreLeadSubmit);
        }

        if (infoMatch) {
            expect.soft(nid, `Invalid NID format: ${nid}`).toMatch(/^X{8}\d{4}$/);
            expect.soft(phone, `Invalid phone format: ${phone}`).toMatch(/^X{6}\d{4}$/);
            expect.soft(infoHours).toBe(statusHours);
        }
    });
});

test('Verify duplication prevention rule (NID & Phone check) on website when duplicate Phone record exists', async ({ }, testInfo) => {
    const duplicationPhoneLog = loadJsonLogSafely('src/logs/leadgen-rules/fail-duplication-prevention-phone.json');
    if (!duplicationPhoneLog) test.skip(true, '❌ Skipped due to missing or invalid JSON');

    const acquisitionSettings = testInfo.project.metadata.AcquisitionSettings;
    const { sourceIP, user, action, status, information } = duplicationPhoneLog;
    const statusMatch = status.match(/^Duplication prevention: Failed - Lead exists in DB within (\d+(\.\d+)?)h$/);
    const infoMatch = information.match(/^NID:\s(X{8}\d{4})\s-\sPhone:\s(X{6}\d{4})\s-\sSubmission:\sPhone duplicate within (\d+(\.\d+)?)h$/);
    const [, statusHoursStr] = statusMatch || [];
    const [, nid, phone, infoHoursStr] = infoMatch || [];
    const statusHours = Number(statusHoursStr);
    const infoHours = Number(infoHoursStr);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Duplication prevention - NID & Phone check');
    });

    await test.step('✅ Validate required request fields in status & information log', () => {
        expect.soft(statusMatch, `Format mismatch in status: "${status}"`).not.toBeNull();
        expect.soft(infoMatch, `Format mismatch in information: "${information}"`).not.toBeNull();
    });

    await test.step('✅ Validate field values in status & information log', () => {
        if (statusMatch) {
            expect.soft(statusHours).toBe(acquisitionSettings.IgnoreLeadSubmit);
        }

        if (infoMatch) {
            expect.soft(nid, `Invalid NID format: ${nid}`).toMatch(/^X{8}\d{4}$/);
            expect.soft(phone, `Invalid phone format: ${phone}`).toMatch(/^X{6}\d{4}$/);
            expect.soft(infoHours).toBe(statusHours);
        }
    });
});