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
  options: {
    gap: 22,
    width: 182,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#F6F0F9',
    borderColor: '#E3DCE6',
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.20)',
    height: 44,
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#6D50AC',
    borderColor: '#6D50AC',
  },
  optionPressed: {
    opacity: 0.82,
  },
  optionText: {
    color: '#6543A4',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#FFFFFF',
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
  actionMessage: {
    color: '#57418D',
    fontSize: 13,
    marginTop: 14,
    textAlign: 'center',
  },
  research: {
    alignItems: 'center',
    marginTop: 89,
    maxWidth: 270,
  },
  researchWithMessage: {
    marginTop: 50,
  },
  researchIcon: {
    height: 28,
    width: 24,
  },
  researchMessage: {
    color: '#4F4B55',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
});
