import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: { backgroundColor: colors.peach, paddingHorizontal: 20, paddingVertical: 22, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  safeArea: {
    backgroundColor: colors.canvas,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    minHeight: 610,
    paddingBottom: 30,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  hero: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  illustration: {
    height: 150,
    width: 150,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sky,
  },
  message: {
    fontFamily: fonts.display,
    color: colors.ink,
    fontSize: 28,
    lineHeight: 35,
    marginTop: 46,
    maxWidth: 310,
    textAlign: 'center',
  },
  actions: {
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    minHeight: 48,
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    maxWidth: 282,
    width: '100%',
  },
  continueButtonPressed: {
    opacity: 0.82,
  },
  continueButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '600',
  },
});
