import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

export const styles = StyleSheet.create({
  container: { backgroundColor: colors.sky, borderRadius: 16, padding: 18, gap: 12 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  heading: { color: colors.ink, flex: 1, fontFamily: fonts.display, fontSize: 26, lineHeight: 32, paddingRight: 12 },
  dismissButton: { alignItems: 'center', justifyContent: 'center', minHeight: 44, width: 44 },
  message: { color: colors.ink, fontSize: 13, lineHeight: 20 },
  chartCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  chartWrapper: { paddingHorizontal: 10, paddingTop: 10 },
  emptyChartContent: { alignItems: 'center', justifyContent: 'center', minHeight: 104, paddingHorizontal: 18, paddingVertical: 16 },
  emptyChartText: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  actionsRow: { borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%' },
  actionButton: { alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: 52, minWidth: 82, paddingHorizontal: 6, paddingVertical: 10 },
  actionButtonDivider: { borderRightColor: colors.border, borderRightWidth: 1 },
  actionText: { color: colors.primary, fontSize: 12, fontWeight: '600', lineHeight: 17, textAlign: 'center' },
  buttonPressed: { opacity: 0.65 },
});
