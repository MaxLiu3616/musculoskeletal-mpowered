import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },

  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '500',
    height: 42,
    marginTop: 18,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    paddingHorizontal: 12,
  },

  helperText: {
    color: colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 19,
    marginTop: 12,
  },
});
