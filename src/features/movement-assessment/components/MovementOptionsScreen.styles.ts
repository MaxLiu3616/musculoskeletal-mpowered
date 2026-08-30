import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  instruction: {
    color: '#342E3A',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  optionList: {
    backgroundColor: '#FBF3FC',
    borderRadius: 12,
    marginTop: 14,
    overflow: 'hidden',
  },
  optionRow: {
    alignItems: 'center',
    borderBottomColor: '#D8CEE1',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionRowLast: {
    borderBottomWidth: 0,
  },
  optionRowSelected: {
    backgroundColor: '#F3E8FA',
  },
  optionRowPressed: {
    opacity: 0.76,
  },
  optionText: {
    color: '#342E3A',
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  optionTextAfterControl: {
    marginLeft: 12,
  },
  selectionControl: {
    alignItems: 'center',
    borderColor: '#635C68',
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginLeft: 12,
    width: 22,
  },
  selectionControlSelected: {
    backgroundColor: '#6D50AC',
    borderColor: '#6D50AC',
  },
  checkbox: {
    borderRadius: 4,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  radio: {
    borderRadius: 11,
  },
  radioDot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});
