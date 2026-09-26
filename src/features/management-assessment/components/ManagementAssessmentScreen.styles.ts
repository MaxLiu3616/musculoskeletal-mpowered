import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewport: {
    alignSelf: 'center',
    backgroundColor: colors.canvas,
    overflow: 'hidden',
    width: '100%',
  },

  webViewport: {
    maxWidth: 390,
  },

  safeArea: {
    backgroundColor: colors.canvas,
    flex: 1,
  },

  prompt: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },

  helper: {
    color: colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 19,
    marginTop: 6,
  },

  sourceLabel: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 17,
    marginTop: 14,
  },

  medicationList: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    flexGrow: 0,
    marginTop: 12,
    overflow: 'hidden',
  },

  medicationOption: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  optionPressed: {
    backgroundColor: colors.sky,
  },

  medicationTextGroup: {
    flex: 1,
    paddingRight: 14,
  },

  medicationName: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },

  medicationSchedule: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 1,
  },

  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkmark: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
  },

  textArea: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
    minHeight: 170,
    padding: 12,
    textAlignVertical: 'top',
  },

  choiceList: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    marginTop: 18,
    overflow: 'hidden',
  },

  choiceOption: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: 10,
  },

  radio: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    marginRight: 12,
    width: 18,
  },

  radioSelected: {
    borderColor: colors.primary,
  },

  radioDot: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 8,
    width: 8,
  },

  choiceLabel: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },

  // Summary
  summaryScrollContent: {
    flexGrow: 1,
  },

  summaryScreen: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },

  summaryIntro: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 14,
    marginTop: -10,
  },

  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.softBorder,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },

  summaryTitleRow: {
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryCardTitle: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  summaryPeriod: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'right',
  },

  summaryDivider: {
    backgroundColor: colors.border,
    height: 1,
    marginBottom: 14,
    marginTop: 9,
  },

  summarySectionTitle: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  overviewPanel: {
    backgroundColor: colors.canvas,
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },

  overviewText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
  },

  tipsButton: {
    alignItems: 'center',
    backgroundColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
  },

  tipsButtonPressed: {
    opacity: 0.82,
  },

  tipsButtonText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },

  resultsSection: {
    marginTop: 20,
  },

  resultsContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  resultGroup: {
    marginBottom: 16,
  },

  resultLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 17,
  },

  resultText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 3,
  },

  summaryFooterDivider: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 4,
  },

  summaryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  journalStatus: {
    color: colors.muted,
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 12,
  },

  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 100,
    paddingHorizontal: 20,
  },

  closeButtonPressed: {
    backgroundColor: colors.sky,
  },

  closeButtonText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
