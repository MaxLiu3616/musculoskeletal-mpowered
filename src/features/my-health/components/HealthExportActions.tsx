import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { exportHealthReport } from '@/services/health-report';

import { styles } from './MyHealthScreen.styles';

export default function HealthExportActions({ html }: { html: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const exportReport = async (share: boolean) => {
    setBusy(true);
    setError('');
    try {
      await exportHealthReport(html, share);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The report could not be exported. Please try again.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <View style={styles.field}>
      <View style={styles.exportRow}>
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} onPress={() => void exportReport(false)} style={[styles.outlineButton, busy && styles.disabled]}><Text style={styles.outlineText}>{busy ? 'Preparing…' : 'Print PDF'}</Text></Pressable>
        {Platform.OS !== 'web' ? <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} onPress={() => void exportReport(true)} style={[styles.outlineButton, busy && styles.disabled]}><Text style={styles.outlineText}>Share PDF</Text></Pressable> : null}
      </View>
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    </View>
  );
}
