import { test, expect } from '@playwright/test';
import apiLog from '../../../src/api-log/LMService/newLead.json';
import apiLogDropoffScheduler from '../../../src/api-log/LMService/newLeadDropoffScheduler.json';
import apiLogDropoffSkip from '../../../src/api-log/LMService/newLeadDropoffSkip.json';
import { XMLParser } from 'fast-xml-parser';

const testCases = [
    'happy case',
    'dropoff skip',
    'dropoff scheduler'
];

for (const testCase of testCases) {
    test(`Verify request payload of API: LMService/newLead (with PL product & ${testCase})`, async () => {
        const apiMap: Record<string, any> = {
            'happy case': apiLog,
            'dropoff skip': apiLogDropoffSkip,
            'dropoff scheduler': apiLogDropoffScheduler
        };
        const { Url, Method, Request } = apiMap[testCase];
        // ✅ Parse SOAP XML
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsed = parser.parse(Request);
        const newLead = parsed['soapenv:Envelope']?.['soapenv:Body']?.['lmap:newLead'];
        const sysRequest = newLead?.SysRequest;
        // ✅ Parse inner CDATA inside <Application>
        const applicationCdata = newLead?.Lead?.Application;
        expect.soft(applicationCdata).toBeTruthy();
        const innerXml = parser.parse(applicationCdata);
        const application = innerXml['tns:Application'];

        await test.step('✅ Validate endpoint & method', () => {
            expect.soft(Url).toBe('https://publicapi-uat.fecredit.com.vn:4443/LMService');
            expect.soft(Method).toBe('POST');
        });

        await test.step('✅ Validate required <SysRequest> fields', () => {
            expect.soft(sysRequest).toHaveProperty('UUID');
            expect.soft(sysRequest).toHaveProperty('RequestorID');
            expect.soft(sysRequest).toHaveProperty('DT');
        });

        await test.step('✅ Validate <SysRequest> field formats', () => {
            expect.soft(sysRequest.UUID).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
            expect.soft(sysRequest.RequestorID).toBe('FEC');
            expect.soft(sysRequest.DT).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/); // ISO UTC format
        });

        await test.step('✅ Validate required <Application> fields', () => {
            expect.soft(application).toHaveProperty('@_ExtID');
            expect.soft(application).toHaveProperty('@_PartnerID');
            expect.soft(application).toHaveProperty('Campaign');
            expect.soft(application.Campaign).toHaveProperty('ID');
            expect.soft(application.Campaign).toHaveProperty('LeadSource');
            expect.soft(application).toHaveProperty('Fullname');
            expect.soft(application).toHaveProperty('NationalID');
            expect.soft(application).toHaveProperty('PhoneNumber');
            expect.soft(application).toHaveProperty('Email');
            expect.soft(application).toHaveProperty('Address');
            expect.soft(application).toHaveProperty('City');
            expect.soft(application).toHaveProperty('ProductChannel');
            expect.soft(application).toHaveProperty('HowDoYouKnow');
            expect.soft(application).toHaveProperty('SourceInfo');
            expect.soft(application).toHaveProperty('VerificationCode');
            expect.soft(application).toHaveProperty('LoanAmount');
            expect.soft(application).toHaveProperty('ProductCode');
            expect.soft(application).toHaveProperty('InterestRate');
            expect.soft(application).toHaveProperty('ScoreRange');
            expect.soft(application).toHaveProperty('SelfInitiated');
            expect.soft(application).toHaveProperty('Tenor');
            expect.soft(application).toHaveProperty('Scheme_ID');
            expect.soft(application).toHaveProperty('Utm');
        });

        await test.step('✅ Validate <Application> field formats', () => {
            expect.soft(application['@_ExtID']).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
            expect.soft(application['@_PartnerID']).toBe('CustomerLab');
            expect.soft(application.Campaign.ID).toBe(393);
            if (testCase === 'happy case') {
                expect.soft(application.Campaign.LeadSource).toBe('FECWEBSITE');
            } else if (testCase === 'dropoff skip') {
                expect.soft(application.Campaign.LeadSource).toBe('FECWEBSITE_SKIP_P2');
            } else if (testCase === 'dropoff scheduler') {
                expect.soft(application.Campaign.LeadSource).toBe('DROPOFF_WEB');
            };
            expect.soft(application.Fullname).not.toBe('');
            expect.soft(application.NationalID).toMatch(/^X{8}\d{4}$/); // e.g., XXXXXXXX0192
            expect.soft(application.PhoneNumber).toMatch(/^X{7}\d{4}$/); // e.g., XXXXXXX0789
            if (testCase === 'happy case') {
                expect.soft(application.Email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            } else {
                expect.soft(application.Email).toBe('');
            }
            expect.soft(application.Address).toBe('');
            expect.soft(application.City).toBe('');
            expect.soft(application.ProductChannel).toBe('PL');
            expect.soft(application.HowDoYouKnow).toBe('');
            expect.soft(application.SourceInfo).toBe('WEBSITE');
            expect.soft(application.VerificationCode).toBe('');
            expect.soft(application.LoanAmount).toBe(0);
            expect.soft(application.ProductCode).toBe('');
            expect.soft(application.InterestRate).toBe(0);
            expect.soft(application.ScoreRange).toBe('');
            expect.soft(application.SelfInitiated).toBe('');
            expect.soft(application.Tenor).toBe(0);
            expect.soft(application.Scheme_ID).toBe('');
            expect.soft(application.Utm).not.toBe('');
        });
    });
};