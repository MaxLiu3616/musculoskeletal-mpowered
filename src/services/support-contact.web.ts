export async function pickSupportContact(): Promise<{ name: string; phones: string[]; email: string } | null> {
  throw new Error('Use the mobile app to choose a contact, or enter the details manually.');
}
