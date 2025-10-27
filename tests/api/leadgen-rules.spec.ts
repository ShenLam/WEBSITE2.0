import { test, expect } from '@playwright/test';
import ageLog from '../../src/api-log/leadgen-rules/age-validation.json';
import duplicationLog from '../../src/api-log/leadgen-rules/duplication-prevention.json';
import fraudLog from '../../src/api-log/leadgen-rules/fraud-prevention.json';

test('Verify age validation rule on website', async () => {
    const { sourceIP, user, action, status, information } = ageLog;
    const nidMatch = information.match(/NID:\s([A-Z0-9]+)/);
    const phoneMatch = information.match(/Phone:\s([A-Z0-9]+)/);
    const ageMatch = information.match(/Age:\s(\d{1,3})/);
    const nid = nidMatch?.[1];
    const phone = phoneMatch?.[1];
    const age = parseInt(ageMatch?.[1] || '0', 10);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Age validation');
    });

    await test.step('✅ Validate status & individual fields in information log', () => {
        expect.soft(status).toBe('Age validation: Passed - Allowed range [21, 59]');
        expect.soft(nid).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
        expect.soft(phone).toMatch(/^X{6}\d{4}$/); // e.g. XXXXXX1234
        expect.soft(age).toBeGreaterThanOrEqual(21);
        expect.soft(age).toBeLessThanOrEqual(59);
    });
});

test('Verify fraud prevention rule (IP rate limit) on website', async () => {
    const { sourceIP, user, action, status, information } = fraudLog;

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Fraud prevention - IP rate limit');
    });

    await test.step('✅ Validate status & individual fields in information log', () => {
        const statusSubmittedMatch = status.match(/Fraud prevention: Passed - (\d+)\//);
        const statusLimitMatch = status.match(/\/(\d+) submissions/);
        const statusiInLastMatch = status.match(/in last (\d+(\.\d+)?)h$/);

        const statusSubmitted = parseInt(statusSubmittedMatch?.[1] || '0', 10);
        const statusLimit = parseInt(statusLimitMatch?.[1] || '0', 10);
        const statusiInLast = parseFloat(statusiInLastMatch?.[1] || '0');

        expect.soft(statusSubmitted).toBeLessThanOrEqual(statusLimit);
        expect.soft(statusLimit).toBeGreaterThan(0);
        expect.soft(statusiInLast).toBeGreaterThan(0);
    });
});

test('Verify duplication prevention rule (NID & Phone check) on website', async () => {
    const { sourceIP, user, action, status, information } = duplicationLog;
    const nidMatch = information.match(/NID:\s([A-Z0-9]+)/);
    const phoneMatch = information.match(/Phone:\s([A-Z0-9]+)/);
    const ageMatch = information.match(/Age:\s(\d{1,3})/);
    const nid = nidMatch?.[1];
    const phone = phoneMatch?.[1];
    const age = parseInt(ageMatch?.[1] || '0', 10);

    await test.step('✅ Validate sourceIP, user, action', () => {
        expect.soft(sourceIP).toMatch(/^(:{2}ffff:)?\d{1,3}(\.\d{1,3}){3}$/);
        expect.soft(user).toBe('Anonymous');
        expect.soft(action).toBe('Duplication prevention - NID & Phone check');
    });

    await test.step('✅ Validate status & individual fields in information log', () => {
        //     expect.soft(status).toBe('Age validation: Passed - Allowed range [21, 59]');
        //     expect.soft(nid).toMatch(/^X{8}\d{4}$/); // e.g. XXXXXXXX1234
        //     expect.soft(phone).toMatch(/^X{6}\d{4}$/); // e.g. XXXXXX1234
        //     expect.soft(age).toBeGreaterThanOrEqual(21);
        //     expect.soft(age).toBeLessThanOrEqual(59);
    });
});