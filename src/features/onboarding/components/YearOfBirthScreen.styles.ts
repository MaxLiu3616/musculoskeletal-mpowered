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
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderBottomColor: colors.muted,
    borderBottomWidth: 1,
    color: colors.ink,
    fontSize: 16,
    height: 58,
    paddingHorizontal: 16,
    textAlign: 'center',
    width: 182,
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
});
