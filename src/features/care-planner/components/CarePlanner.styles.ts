import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

import { styles as healthStyles } from '@/features/my-health/components/MyHealthScreen.styles';

export const styles = {
  ...healthStyles,
  ...StyleSheet.create({
    planningHero: { backgroundColor: colors.primary, padding: 20, borderRadius: 16, gap: 12 },
    planningTitle: { color: colors.surface, fontFamily: fonts.display, fontSize: 29, lineHeight: 34 },
    planningDescription: { color: colors.surface, fontSize: 14, lineHeight: 21 },
    tipsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.peach, padding: 17, borderRadius: 14, minHeight: 84 },
    appointmentsHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 6 },
    appointmentsTitle: { color: colors.ink, fontFamily: fonts.display, fontSize: 26, lineHeight: 32, flexShrink: 1 },
    appointmentCount: { color: colors.ink, fontSize: 14, fontWeight: '600', backgroundColor: colors.sky, borderRadius: 12, paddingHorizontal: 11, paddingVertical: 4 },
    appointmentEmpty: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.softBorder, minHeight: 142, padding: 20, gap: 8, alignItems: 'center', justifyContent: 'center' },
    panel: { borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 18, gap: 20 },
    notice: { backgroundColor: colors.sky, borderRadius: 10, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
    noticeText: { flex: 1, fontSize: 13, lineHeight: 19, color: colors.ink },
    appointmentRow: { backgroundColor: colors.surface, borderRadius: 10, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center' },
    sponsor: { color: colors.ink, fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 8 },
    checkRow: { backgroundColor: colors.sky, borderRadius: 10, padding: 14, minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkedRow: { backgroundColor: colors.sky, borderColor: colors.border, borderWidth: 1, padding: 13 },
    checkText: { color: colors.ink, fontSize: 14, lineHeight: 21, flex: 1 },
    group: { gap: 8 },
    footerRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 12, backgroundColor: colors.canvas },
    flex: { flex: 1 },
    calendarRow: { flexDirection: 'row' },
    calendarGrid: { flexShrink: 1 },
    answerButton: { minHeight: 44 },
    calendarCell: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
    calendarSelected: { backgroundColor: colors.primary },
    calendarHeading: { textAlign: 'center', flex: 1, color: colors.ink, fontSize: 15, fontWeight: '600' },
    signature: { height: 170, backgroundColor: colors.sky, borderRadius: 8, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', touchAction: 'none' },
    signatureDrawing: { pointerEvents: 'none' },
    signatureHint: { position: 'absolute', top: 72, left: 12, right: 12, textAlign: 'center', color: colors.muted, fontSize: 13, pointerEvents: 'none' },
    answerInput: { minHeight: 180, textAlignVertical: 'top' },
    success: { color: colors.success, fontSize: 13, lineHeight: 19 },
  }),
};
