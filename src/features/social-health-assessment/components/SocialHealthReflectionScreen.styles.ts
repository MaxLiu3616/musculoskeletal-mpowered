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
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 18,
    minHeight: 92,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
});
