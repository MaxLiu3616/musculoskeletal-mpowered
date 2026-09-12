import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function exportHealthReport(html: string, share: boolean) {
  if (share) {
    if (!await Sharing.isAvailableAsync()) throw new Error('Sharing is not available on this device. Use Print PDF instead.');
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', UTI: '.pdf', dialogTitle: 'Share your health report' });
  } else {
    await Print.printAsync({ html });
  }
}
