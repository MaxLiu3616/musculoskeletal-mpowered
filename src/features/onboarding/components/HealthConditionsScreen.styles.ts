import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    minHeight: 680,
    paddingTop: 72,
    width: '100%',
  },
  title: {
    color: '#17151B',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 27,
    maxWidth: 330,
    textAlign: 'center',
  },
  diagnosisOptions: {
    gap: 20,
    marginTop: 42,
    width: 238,
  },
  diagnosisOption: {
    alignItems: 'center',
    backgroundColor: '#F6F0F9',
    borderBottomColor: '#7357AD',
    borderBottomWidth: 1,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  diagnosisOptionSelected: {
    backgroundColor: '#6D50AC',
    borderBottomColor: '#6D50AC',
  },
  optionPressed: {
    opacity: 0.82,
  },
  diagnosisOptionText: {
    color: '#57418D',
    fontSize: 15,
    fontWeight: '600',
  },
  diagnosisOptionTextSelected: {
    color: '#FFFFFF',
  },
  information: {
    color: '#4F4B55',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 45,
    maxWidth: 290,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 34,
    maxWidth: 282,
    width: '100%',
  },
  primaryButtonDisabled: {
    backgroundColor: '#E7D8FF',
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
  selectionContent: {
    paddingTop: 54,
  },
  selectionHelper: {
    color: '#4F4B55',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#F1EDF4',
    borderBottomColor: '#5E5862',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 48,
    marginTop: 28,
    maxWidth: 282,
    paddingLeft: 16,
    width: '100%',
  },
  searchInput: {
    color: '#17151B',
    flex: 1,
    fontSize: 15,
    height: '100%',
    paddingRight: 8,
  },
  clearSearchButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  clearSearchButtonPressed: {
    backgroundColor: '#E4DCEB',
  },
  clearSearchText: {
    color: '#57418D',
    fontSize: 24,
    lineHeight: 26,
  },
  conditionsList: {
    borderColor: '#E3DCE6',
    borderWidth: 1,
    height: 310,
    marginTop: 14,
    maxWidth: 282,
    width: '100%',
  },
  conditionsListContent: {
    paddingBottom: 1,
  },
  conditionOption: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E3DCE6',
    borderBottomWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  conditionOptionSelected: {
    backgroundColor: '#6D50AC',
  },
  conditionOptionText: {
    color: '#342E3A',
    fontSize: 14,
    lineHeight: 20,
  },
  conditionOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  noResults: {
    color: '#6A646E',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 24,
    textAlign: 'center',
  },
  selectionButton: {
    marginTop: 26,
  },
  skipButton: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 44,
    paddingHorizontal: 18,
  },
  skipButtonPressed: {
    backgroundColor: '#F2EEF8',
  },
  skipButtonText: {
    color: '#57418D',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  otherContent: {
    paddingTop: 102,
  },
  otherInput: {
    backgroundColor: '#EAE6EF',
    borderBottomColor: '#5E5862',
    borderBottomWidth: 1,
    color: '#17151B',
    fontSize: 15,
    height: 132,
    marginTop: 46,
    maxWidth: 282,
    padding: 16,
    textAlignVertical: 'top',
    width: '100%',
  },
  otherButton: {
    marginTop: 52,
  },
});
