import { test, expect, Locator, Page } from '@playwright/test';

const NAV_ITEM_SELECTOR = 'div.location-lookup-result div.location-lookup-categories-list ul li.nav-item';

test('ĐIỂM THANH TOÁN', async ({ page }) => {
    await page.goto('./tim-diem-thanh-toan-giai-ngan/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('div.location-cards div.location-card').nth(0)).toHaveClass('location-card active ');

    // Expected nav items
    const expectedItems = [
        'Tất cả (5443)',
        'Bách Hóa Xanh (1766)',
        'Điện Máy Xanh (2030)',
        'Thế Giới Di Động (936)',
        'VNPost (443)',
        'VPBank (268)',
    ];
    const navItems = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItems, expectedItems);

    // Verify dropdown visibility
    await expectDropdownsVisibility(page, {
        '#channel': 'visible',
        '#locationProvince': 'visible',
        '#locationDistrict': 'visible',
        '#locationWard': 'visible',
    });

    // Select province & district
    await selectDropdownOption(page, '#locationProvince', 'Tỉnh Bà Rịa - Vũng Tàu');
    await selectDropdownOption(page, '#locationDistrict', 'Thị xã Phú Mỹ');

    // Click "Tìm kiếm"
    await page.getByRole('button', { name: /Tìm kiếm/i }).click();
    await page.locator('div.location-lookup-categories-list').waitFor({ state: 'visible' });

    // Verify updated nav items
    const expectedItemsAfterSearch = [
        'Tất cả (21)',
        'Bách Hóa Xanh (12)',
        'Điện Máy Xanh (8)',
        'Thế Giới Di Động (1)',
    ];
    const navItemsAfterSearch = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItemsAfterSearch, expectedItemsAfterSearch);
});

test('ĐIỂM GIẢI NGÂN', async ({ page }) => {
    await page.goto('./tim-diem-thanh-toan-giai-ngan/?locationType=108272', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('div.location-cards div.location-card').nth(1)).toHaveClass('location-card active ');

    // Expected nav items
    const expectedItems = [
        'Tất cả (6937)',
        'AVA KIDS (62)',
        'BIDV (1084)',
        'Điện Máy Xanh (2031)',
        'FPT (635)',
        'Thế Giới Di Động (936)',
        'TopZone (87)',
        'VietinBank (1109)',
        'VNPost (705)',
        'VPBank (288)',
    ];
    const navItems = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItems, expectedItems);

    // Verify dropdown visibility
    await expectDropdownsVisibility(page, {
        '#channel': 'visible',
        '#locationProvince': 'visible',
        '#locationDistrict': 'visible',
        '#locationWard': 'visible',
    });

    // Select channel & province & district
    await page.locator('#channel').getByText('Tất cả').first().click();
    await page.locator('#channel').getByText('Điện Máy Xanh').click();
    console.log('✅ Selected channel: Điện Máy Xanh');

    await selectDropdownOption(page, '#locationProvince', 'Tỉnh Đắk Nông');
    await selectDropdownOption(page, '#locationDistrict', 'Đăk Glong');

    // Click "Tìm kiếm"
    await page.getByRole('button', { name: /Tìm kiếm/i }).click();
    await page.locator('div.location-lookup-categories-list').waitFor({ state: 'visible' });

    // Verify updated nav items
    const expectedItemsAfterSearch = ['Tất cả (2)'];
    const navItemsAfterSearch = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItemsAfterSearch, expectedItemsAfterSearch);
});

test('ĐIỂM GIỚI THIỆU DỊCH VỤ', async ({ page }) => {
    await page.goto('./tim-diem-thanh-toan-giai-ngan/?locationType=108275', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('div.location-cards div.location-card').nth(2)).toHaveClass('location-card active hideChan');

    // Expected nav items
    const expectedItems = ['Tất cả (13656)'];
    const navItems = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItems, expectedItems);

    // Verify dropdown visibility
    await expectDropdownsVisibility(page, {
        '#channel': 'hidden',
        '#locationProvince': 'visible',
        '#locationDistrict': 'visible',
        '#locationWard': 'visible',
    });

    // Select province & district
    await selectDropdownOption(page, '#locationProvince', 'Thành phố Hồ Chí Minh');
    await selectDropdownOption(page, '#locationDistrict', 'Quận 1');

    // Click "Tìm kiếm"
    await page.getByRole('button', { name: /Tìm kiếm/i }).click();
    await page.locator('div.location-lookup-categories-list').waitFor({ state: 'visible' });

    // Verify updated nav items
    const expectedItemsAfterSearch = ['Tất cả (19)'];
    const navItemsAfterSearch = page.locator(NAV_ITEM_SELECTOR);
    await expectVisibleItemsMatch(navItemsAfterSearch, expectedItemsAfterSearch);
});

/**
 * Verify that all visible items under a locator match the expected text list.
 * @param locator - The Playwright Locator for nav items
 * @param expectedItems - The expected list of visible text content (in order)
 */
export async function expectVisibleItemsMatch(locator: Locator, expectedItems: string[]) {
    const total = await locator.count();
    const visibleTexts: string[] = [];

    for (let i = 0; i < total; i++) {
        const item = locator.nth(i);
        if (await item.isVisible()) {
            const text = (await item.textContent())?.trim();
            if (text) visibleTexts.push(text);
        }
    }

    expect(visibleTexts.length, '❌ Mismatch in number of visible items').toBe(expectedItems.length);

    for (let i = 0; i < expectedItems.length; i++) {
        expect(visibleTexts[i], `❌ Item ${i + 1} text mismatch`).toBe(expectedItems[i]);
        console.log(`✅ Item ${i + 1} is correct: "${visibleTexts[i]}"`);
    }
}

async function expectDropdownsVisibility(page: Page, visibilityMap: Record<string, 'visible' | 'hidden'>) {
    for (const [selector, expectedState] of Object.entries(visibilityMap)) {
        const dropdown = page.locator(selector);
        if (expectedState === 'visible') {
            await expect(dropdown).toBeVisible();
            console.log(`✅ ${selector} is visible`);
        } else {
            await expect(dropdown).toBeHidden();
            console.log(`✅ ${selector} is hidden`);
        }
    }
}

async function selectDropdownOption(page: Page, selector: string, optionLabel: string) {
    const dropdown = page.locator(selector);
    await dropdown.getByText('Tất cả').first().click();
    await page.getByText(optionLabel, { exact: true }).click();
    console.log(`✅ Selected from ${selector}: ${optionLabel}`);
}
