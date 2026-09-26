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

  promptUnderline: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  helper: {
    color: colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 19,
    marginTop: 4,
  },

  optionsScroll: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    height: 340,
    marginTop: 12,
  },

  options: {
    paddingHorizontal: 4,
  },

  option: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: 4,
  },

  optionPressed: {
    backgroundColor: colors.sky,
  },

  optionTextCheckbox: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    marginRight: 10,
  },

  checkboxSquare: {
    alignItems: 'center',
    borderColor: colors.muted,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  checkboxSquareSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkmark: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
  },

  optionText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    marginLeft: 10,
    paddingRight: 14,
  },

  optionTextSelected: {
    color: colors.muted,
  },

  optionList: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
  },

  optionRow: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  optionRowLast: {
    borderBottomWidth: 0,
  },

  optionRowSelected: {
    backgroundColor: colors.sky,
  },

  optionRowPressed: {
    opacity: 0.76,
  },

  radio: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
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

  modalInput: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 18,
    minHeight: 92,
    paddingHorizontal: 12,
    paddingVertical: 11,
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

  summaryHighlightBox: {
    backgroundColor: colors.canvas,
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },

  summaryHighlightText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
  },

  summaryHighlightBold: {
    fontWeight: '700',
  },

  exploreTipsButton: {
    alignItems: 'center',
    backgroundColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
  },

  exploreTipsButtonPressed: {
    opacity: 0.82,
  },

  exploreTipsText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },

  summaryResultsSection: {
    marginTop: 20,
  },

  summaryResultsContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  summaryResultGroup: {
    marginBottom: 16,
  },

  summaryItem: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },

  summaryText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 2,
  },

  summaryReflectionSection: {
    marginTop: 2,
  },

  summaryReflectionContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  summaryFooterDivider: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 10,
  },

  summaryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  sessionNote: {
    color: colors.muted,
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 12,
  },

  summaryCloseButton: {
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

  summaryCloseButtonPressed: {
    backgroundColor: colors.sky,
  },

  summaryCloseButtonText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
