import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    left: 12,
    paddingHorizontal: 12,
    position: 'absolute',
    top: 8,
    zIndex: 1,
  },
  backButtonPressed: {
    backgroundColor: '#F2EEF8',
  },
  backButtonText: {
    color: '#57418D',
    fontSize: 16,
    fontWeight: '600',
  },
  screen: {
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingVertical: 44,
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
    transform: [{ translateY: -18 }],
    width: '100%',
  },
  title: {
    color: '#17151B',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 26,
  },
  input: {
    backgroundColor: '#EAE6EF',
    borderBottomColor: '#5E5862',
    borderBottomWidth: 1,
    color: '#17151B',
    fontSize: 16,
    height: 58,
    paddingHorizontal: 16,
    textAlign: 'center',
    width: '72%',
  },
  personalisationMessage: {
    color: '#17151B',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginTop: 76,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 34,
    width: '100%',
  },
  primaryButtonDisabled: {
    backgroundColor: '#E7D8FF',
  },
  entryButton: {
    width: '82%',
  },
  primaryButtonPressed: {
    opacity: 0.82,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButtonTextDisabled: {
    color: '#554766',
  },
  addressMessage: {
    color: '#4F4B55',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 38,
    textAlign: 'center',
  },
  greetingContent: {
    width: '100%',
  },
  greeting: {
    color: '#17151B',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 29,
  },
  greetingIntro: {
    color: '#17151B',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 42,
  },
  greetingButton: {
    marginTop: 60,
  },
  termsText: {
    color: '#17151B',
    fontSize: 18,
    lineHeight: 27,
    marginTop: 50,
  },
  termsEmphasis: {
    fontWeight: '700',
  },
});
