import { Contact, requestPermissionsAsync } from 'expo-contacts';

export async function pickSupportContact() {
  const permission = await requestPermissionsAsync();
  if (!permission.granted) throw new Error('Contacts access was not allowed. You can enter the details manually.');
  const contact = await Contact.presentPicker();
  if (!contact) return null;
  const [name, phones, emails] = await Promise.all([contact.getFullName(), contact.getPhones(), contact.getEmails()]);
  return { name, phones: phones.flatMap((phone) => phone.number ? [phone.number] : []), email: emails[0]?.address ?? '' };
}
