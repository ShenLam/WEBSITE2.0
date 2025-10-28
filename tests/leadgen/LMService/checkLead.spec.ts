import { test, expect } from '@playwright/test';
import apiLog from '../../../src/logs/LMService/checkLead.json';
import { XMLParser } from 'fast-xml-parser';

test('Verify request payload of API: LMService/checkLead', async ({ }, testInfo) => {
    const { Url, Method, Request } = apiLog;
    const expectedUrl = testInfo.project.metadata.Endpoints.LMService;
    // ✅ Parse SOAP XML
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(Request);
    const checkLead = parsed['soapenv:Envelope']?.['soapenv:Body']?.['lmap:checkLead'];
    const sysRequest = checkLead?.SysRequest;
    // ✅ Parse inner CDATA inside <Application>
    const applicationCdata = checkLead?.Lead?.Application;
    expect.soft(applicationCdata).toBeTruthy();
    const innerXml = parser.parse(applicationCdata);
    const application = innerXml['tns:Application'];

    await test.step('✅ Validate endpoint & method', () => {
        expect.soft(Url).toBe(expectedUrl);
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
        expect.soft(application).toHaveProperty('@_ParentExtID');
        expect.soft(application).toHaveProperty('@_PartnerID');
        expect.soft(application).toHaveProperty('@_version');
        expect.soft(application).toHaveProperty('Campaign');
        expect.soft(application.Campaign).toHaveProperty('ID');
        expect.soft(application.Campaign).toHaveProperty('LeadSource');
        expect.soft(application).toHaveProperty('NationalID');
        expect.soft(application).toHaveProperty('PhoneNumber');
    });

    await test.step('✅ Validate <Application> field formats', () => {
        expect.soft(application['@_ExtID']).toBe('');
        expect.soft(application['@_ParentExtID']).toBe('');
        expect.soft(application['@_PartnerID']).toBe('');
        expect.soft(application['@_version']).toBe('1');
        expect.soft(application.Campaign.ID).toBe(393);
        expect.soft(application.Campaign.LeadSource).toBe('LP');
        expect.soft(application.NationalID).toMatch(/^X{8}\d{4}$/); // e.g., XXXXXXXX0192
        expect.soft(application.PhoneNumber).toMatch(/^X{7}\d{4}$/); // e.g., XXXXXXX0789
    });
});
