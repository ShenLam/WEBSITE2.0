export function generateRandomNID(): string {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Age range: 25 to 55
    const minAge = 25;
    const maxAge = 55;
    const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;

    const birthYear = currentYear - randomAge;
    const birthYearShort = String(birthYear).slice(-2); // Last 2 digits of birth year

    // Century + Gender code: '0' = male born in 1900–1999, '2' = male born in 2000–2099
    const centuryGenderCode = birthYear < 2000 ? '0' : '2';

    // Generate 6 random digits for the serial number
    const serial = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');

    // Format: ProvinceCode (079) + CenturyGender + YY + RandomSerial
    return `079${centuryGenderCode}${birthYearShort}${serial}`;
}

export function generateRandomPhone(): string {
    // Valid Vietnamese telecom prefixes
    const validPrefixes = [
        // Viettel
        '096', '097', '098', '086', '032', '033', '034', '035', '036', '037', '038', '039',
        // Mobifone
        '090', '093', '089', '070', '076', '077', '078', '079',
        // Vinaphone
        '091', '094', '088', '081', '082', '083', '084', '085',
        // Vietnamobile
        '092', '052', '056', '058',
        // Gmobile
        '099', '059',
        // iTelecom
        '087'
    ];

    // Randomly select a valid prefix
    const prefix = validPrefixes[Math.floor(Math.random() * validPrefixes.length)];

    // Generate 7 random digits to complete the 10-digit number
    const numberBody = Math.floor(Math.random() * 1_000_0000).toString().padStart(7, '0');

    return prefix + numberBody;
}