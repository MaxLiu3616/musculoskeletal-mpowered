import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },

  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 16,
    minHeight: 120,
    padding: 14,
    textAlignVertical: 'top',
  },
});
