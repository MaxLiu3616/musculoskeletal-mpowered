import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  instruction: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  instructionEmphasis: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  optionList: {
    backgroundColor: '#FBF3FC',
    borderRadius: 6,
    marginTop: 10,
    overflow: 'hidden',
  },

  optionRow: {
    alignItems: 'center',
    borderBottomColor: '#D9D0DE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  optionRowLast: {
    borderBottomWidth: 0,
  },

  optionRowSelected: {
    backgroundColor: '#F1E4F7',
  },

  optionRowPressed: {
    opacity: 0.76,
  },

  radio: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#514D57',
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  radioSelected: {
    borderColor: '#6D50AC',
  },

  radioDot: {
    backgroundColor: '#6D50AC',
    borderRadius: 4,
    height: 8,
    width: 8,
  },

  optionText: {
    color: '#17151B',
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
    marginLeft: 10,
  },
});