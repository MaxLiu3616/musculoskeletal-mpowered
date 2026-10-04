import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.peach,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  onboardingHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  backButton: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: colors.sky,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  screen: {
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '100%',
  },
  greetingScreen: {
    paddingHorizontal: 42,
  },
  sexScreen: {
    paddingHorizontal: 36,
  },
  entryContent: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: fonts.display,
    letterSpacing: -0.5,
    color: colors.ink,
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 38,
    marginBottom: 26,
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
    width: '72%',
  },
  personalisationMessage: {
    color: colors.ink,
    fontSize: 16,
    fontStyle: 'normal',
    lineHeight: 24,
    marginTop: 32,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 34,
    width: '100%',
  },
  primaryButtonDisabled: {
    backgroundColor: colors.sky,
  },
  entryButton: {
    width: '82%',
  },
  primaryButtonPressed: {
    opacity: 0.82,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButtonTextDisabled: {
    color: colors.muted,
  },
  addressMessage: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 38,
    textAlign: 'center',
  },
  greetingContent: {
    width: '100%',
  },
  greeting: {
    fontFamily: fonts.display,
    letterSpacing: -0.5,
    color: colors.ink,
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 38,
  },
  greetingIntro: {
    fontFamily: fonts.display,
    letterSpacing: -0.5,
    color: colors.ink,
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 38,
    marginTop: 42,
  },
  greetingButton: {
    marginTop: 60,
  },
  termsText: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 27,
    marginTop: 50,
  },
  termsEmphasis: {
    fontWeight: '700',
  },
});
