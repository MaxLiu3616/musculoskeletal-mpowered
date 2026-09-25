import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    minHeight: 680,
    paddingTop: 117,
    width: '100%',
  },
  title: {
    fontFamily: fonts.display,
    letterSpacing: -0.5,
    color: colors.ink,
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 38,
    marginBottom: 38,
  },
  options: {
    gap: 22,
    width: 182,
  },
  option: {
    alignItems: 'center',
    backgroundColor: colors.sky,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionPressed: {
    opacity: 0.82,
  },
  optionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.surface,
  },
  continueButton: {
    minHeight: 48,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 46,
    maxWidth: 282,
    width: '100%',
  },
  continueButtonDisabled: {
    backgroundColor: colors.sky,
  },
  continueButtonPressed: {
    opacity: 0.82,
  },
  continueButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: colors.muted,
  },
  research: {
    alignItems: 'center',
    marginTop: 89,
    maxWidth: 270,
  },
  researchMessage: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
});
