import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  instruction: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },

  instructionEmphasis: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  optionList: {
    backgroundColor: colors.canvas,
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
  },

  optionRow: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  optionRowLast: {
    borderBottomWidth: 0,
  },

  optionRowSelected: {
    backgroundColor: colors.sky,
  },

  optionRowPressed: {
    opacity: 0.76,
  },

  optionText: {
    color: colors.ink,
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
    borderColor: colors.muted,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginLeft: 12,
    width: 22,
  },

  selectionControlSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkbox: {
    borderRadius: 4,
  },

  checkmark: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },

  radio: {
    borderRadius: 11,
  },

  radioDot: {
    backgroundColor: colors.surface,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});
