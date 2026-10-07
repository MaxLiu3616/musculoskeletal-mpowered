// Strips +61 / 61 and a leading 0, leaving the 9-digit national number
export const toAuNationalNumber = (raw: string) => {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('61')) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = digits.slice(1);
    return digits;
};

export const isValidAuMobile = (raw: string) =>
    /^4\d{8}$/.test(toAuNationalNumber(raw));

export const toE164 = (raw: string) => `+61${toAuNationalNumber(raw)}`;

export const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);