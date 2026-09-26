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
    marginTop: 5,
  },

  optionsScroll: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    flexGrow: 0,
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
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  optionPressed: {
    backgroundColor: colors.sky,
  },

  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    marginLeft: 'auto',
    pointerEvents: 'none',
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

  optionText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    paddingRight: 14,
  },

  optionTextSelected: {
    color: colors.muted,
  },

  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(23, 21, 27, 0.42)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    maxWidth: 330,
    padding: 16,
    width: '88%',
  },

  modalInputContainer: {
    backgroundColor: colors.sky,
    borderBottomColor: colors.muted,
    borderBottomWidth: 1,
    minHeight: 104,
    paddingHorizontal: 12,
    paddingTop: 9,
  },

  modalInputLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
  },

  modalInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.ink,
    fontSize: 13,
    height: 48,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    paddingHorizontal: 0,
    paddingVertical: 4,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },

  modalButton: {
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 64,
    paddingHorizontal: 10,
  },

  modalButtonPressed: {
    backgroundColor: colors.sky,
  },

  modalButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  modalButtonTextDisabled: {
    color: colors.muted,
  },

  intensityPromptRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },

  intensityPrompt: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },

  intensityInput: {
    borderBottomColor: colors.muted,
    borderBottomWidth: 1.5,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
    height: 28,
    marginLeft: 8,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    paddingHorizontal: 2,
    paddingVertical: 0,
    textAlign: 'center',
    width: 52,
  },

  sliderContainer: {
    height: 72,
    marginHorizontal: 4,
    marginTop: 18,
    position: 'relative',
  },

  sliderRail: {
    left: 5,
    position: 'absolute',
    right: 5,
    top: 38,
  },

  sliderTrack: {
    backgroundColor: colors.sky,
    borderRadius: 6,
    height: 12,
    overflow: 'hidden',
  },

  sliderTrackFill: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: 12,
  },

  sliderInput: {
    bottom: 0,
    left: -8,
    opacity: 0.001,
    position: 'absolute',
    right: -8,
    top: 10,
  },

  valueBubble: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: 24,
    justifyContent: 'center',
    minWidth: 28,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 0,
  },

  valueBubbleText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },

  thumbBar: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: 28,
    position: 'absolute',
    top: 28,
    width: 10,
  },

  painDescription: {
    color: colors.ink,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 4,
    minHeight: 36,
    textAlign: 'center',
  },

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
    marginBottom: 4,
    marginTop: 9,
  },

  summarySection: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 14,
  },

  summarySectionTitle: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  summaryText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 4,
  },

  summaryItem: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 3,
  },

  summaryValue: {
    fontWeight: '400',
  },

  summaryIntensityItem: {
    marginTop: 8,
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
