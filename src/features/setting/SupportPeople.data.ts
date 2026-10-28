type ContactDetails = { name: string; phone: string; email: string };

export function getSupportPersonError(person: ContactDetails) {
  if (!person.name.trim()) return 'Enter the support person’s name.';
  const phone = person.phone.trim();
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15 || !/^\+?[\d\s().-]+$/.test(phone)) {
    return 'Enter a valid phone number, including the area or country code.';
  }
  if (person.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email.trim())) {
    return 'Enter a valid email address, or leave it blank.';
  }
  return '';
}

export function sameSupportPerson(first: ContactDetails, second: ContactDetails) {
  const phoneKey = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return /^0\d{9}$/.test(digits) ? `61${digits.slice(1)}` : digits;
  };
  return first.name.trim().toLowerCase() === second.name.trim().toLowerCase()
    && phoneKey(first.phone) === phoneKey(second.phone);
}

export const supportAccessNote = 'Access preferences are saved only. Adding a person does not send an invitation or give them access to your account.';
