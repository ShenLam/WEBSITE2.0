import { test, expect } from '@playwright/test';
import apiLog from '../../../src/api-log/LMService/newLead.json';
import apiLogDropoffScheduler from '../../../src/api-log/LMService/newLeadDropoffScheduler.json';
import apiLogDropoffSkip from '../../../src/api-log/LMService/newLeadDropoffSkip.json';
import { XMLParser } from 'fast-xml-parser';

const testCases = [
    'happy case, Home form, PL product, have UTM & GG param',
    'dropoff skip, Home form, PL product, has UTM param',
    'dropoff scheduler, Home form, PL product, has UTM param'
];

for (const testCase of testCases) {
    test(`Verify request payload of API: LMService/newLead (condition: ${testCase})`, async () => {
        const apiMap: Record<string, any> = {
            'happy case, Home form, PL product, have UTM & GG param': apiLog,
            'dropoff skip, Home form, PL product, has UTM param': apiLogDropoffSkip,
            'dropoff scheduler, Home form, PL product, has UTM param': apiLogDropoffScheduler
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
            expect.soft(application.Fullname).not.toBe('');
            expect.soft(application.NationalID).toMatch(/^X{8}\d{4}$/); // e.g., XXXXXXXX0192
            expect.soft(application.PhoneNumber).toMatch(/^X{7}\d{4}$/); // e.g., XXXXXXX0789
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
            expect.soft(application.Utm).toBe('test_utm_source');

            if (testCase === 'happy case, Home form, PL product, have UTM & GG param') {
                expect.soft(application.Campaign.LeadSource).toBe('FECWEBSITE');
                expect.soft(application.Email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            } else if (testCase === 'dropoff skip, Home form, PL product, has UTM param') {
                expect.soft(application.Campaign.LeadSource).toBe('FECWEBSITE_SKIP_P2');
                expect.soft(application.Email).toBe('');
            } else if (testCase === 'dropoff scheduler, Home form, PL product, has UTM param') {
                expect.soft(application.Campaign.LeadSource).toBe('DROPOFF_WEB');
                expect.soft(application.Email).toBe('');
            } else {
                console.error('Something went wrong!')
            };
        });
    });
};