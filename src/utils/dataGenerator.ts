export function generateRandomNID(): string {
    const now = new Date();
    const currentYear = now.getFullYear();

    const minAge = 21;
    const maxAge = 59;
    const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;

    const birthYear = currentYear - randomAge;
    const birthYearShort = String(birthYear).slice(-2);

    // Giới tính + thế kỷ
    const isMale = Math.random() < 0.5;
    const centuryGenderCode = birthYear < 2000
        ? (isMale ? '0' : '1')
        : (isMale ? '2' : '3');

    // Mã tỉnh cố định
    const provinceCode = '079'; // HCM

    const serial = String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0');

    return `${provinceCode}${centuryGenderCode}${birthYearShort}${serial}`;
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