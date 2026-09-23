import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

export const styles = StyleSheet.create({
  period: { backgroundColor: colors.sky, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  periodLabel: { color: colors.ink, fontSize: 15, lineHeight: 22, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderColor: colors.softBorder, borderWidth: 1, borderRadius: 14, padding: 18, gap: 14 },
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 27, lineHeight: 32 },
  prompt: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  input: { backgroundColor: colors.canvas, borderColor: colors.border, borderWidth: 1, borderRadius: 12, color: colors.ink, fontSize: 15, lineHeight: 23, minHeight: 230, padding: 14, textAlignVertical: 'top' },
  footer: { backgroundColor: colors.canvas, paddingHorizontal: 17, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.softBorder },
});
