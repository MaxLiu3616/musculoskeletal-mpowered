import { StyleSheet } from 'react-native';

import { styles as healthStyles } from '@/features/my-health/components/MyHealthScreen.styles';

export const styles = {
  ...healthStyles,
  ...StyleSheet.create({
    panel: { borderColor: '#C8C1D0', borderWidth: 1, borderRadius: 12, padding: 18, gap: 20 },
    notice: { backgroundColor: '#F4F2F8', borderRadius: 10, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
    noticeText: { flex: 1, fontSize: 13, lineHeight: 19, color: '#38313F' },
    carousel: { backgroundColor: '#F4F2F8', borderRadius: 14, padding: 14, gap: 12 },
    carouselCards: { gap: 12 },
    entryCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, gap: 16, width: 244, justifyContent: 'space-between' },
    dots: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
    dot: { height: 6, width: 6, borderRadius: 3, backgroundColor: '#CBC5D2' },
    activeDot: { width: 24, backgroundColor: '#6850A1' },
    appointmentRow: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center' },
    sponsor: { color: '#17151B', fontSize: 12, fontWeight: '600', textAlign: 'center', marginTop: 8 },
    checkRow: { backgroundColor: '#F4F2F8', borderRadius: 10, padding: 14, minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkedRow: { backgroundColor: '#EEE6FA', borderColor: '#A895C4', borderWidth: 1, padding: 13 },
    checkText: { color: '#24202B', fontSize: 14, lineHeight: 21, flex: 1 },
    group: { gap: 8 },
    footerRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 12, backgroundColor: '#FFFFFF' },
    flex: { flex: 1 },
    calendarRow: { flexDirection: 'row' },
    calendarGrid: { flexShrink: 1 },
    answerButton: { minHeight: 44 },
    calendarCell: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
    calendarSelected: { backgroundColor: '#6850A1' },
    calendarHeading: { textAlign: 'center', flex: 1, color: '#38313F', fontSize: 15, fontWeight: '600' },
    signature: { height: 170, backgroundColor: '#F4F2F8', borderRadius: 8, borderWidth: 1, borderColor: '#BDB3C8', overflow: 'hidden', touchAction: 'none' },
    signatureDrawing: { pointerEvents: 'none' },
    signatureHint: { position: 'absolute', top: 72, left: 12, right: 12, textAlign: 'center', color: '#716979', fontSize: 13, pointerEvents: 'none' },
    answerInput: { minHeight: 180, textAlignVertical: 'top' },
    success: { color: '#406440', fontSize: 13, lineHeight: 19 },
  }),
};
