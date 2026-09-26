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
    paddingHorizontal: 10,
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

  radio: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  radioSelected: {
    borderColor: colors.primary,
  },

  radioDot: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    height: 8,
    width: 8,
  },

  optionText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    marginLeft: 10,
  },
});
