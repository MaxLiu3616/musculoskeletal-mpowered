import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    minHeight: 680,
    paddingTop: 117,
    width: '100%',
  },
  title: {
    color: '#17151B',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 38,
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
    width: 182,
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 46,
    maxWidth: 282,
    width: '100%',
  },
  continueButtonDisabled: {
    backgroundColor: '#E7D8FF',
  },
  continueButtonPressed: {
    opacity: 0.82,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#554766',
  },
});
