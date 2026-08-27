import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    minHeight: 680,
    paddingBottom: 30,
    paddingHorizontal: 32,
    paddingTop: 56,
  },
  hero: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  illustration: {
    height: 205,
    width: 205,
  },
  message: {
    color: '#17151B',
    fontSize: 24,
    lineHeight: 34,
    marginTop: 46,
    maxWidth: 310,
    textAlign: 'center',
  },
  actions: {
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
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
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  actionMessage: {
    color: '#57418D',
    fontSize: 13,
    marginTop: 14,
    textAlign: 'center',
  },
});
