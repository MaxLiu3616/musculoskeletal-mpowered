import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderColor: colors.softBorder,
    borderWidth: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    justifyContent: 'space-between',
    minHeight: 190,
    padding: 18,
    width: 300,
  },

  title: {
    fontFamily: fonts.display,
    letterSpacing: -0.5,
    color: colors.ink,
    fontSize: 26,
    fontWeight: '400',
    lineHeight: 32,
  },

  updatedAt: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 14,
  },

  actionButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 20,
    minHeight: 44,
    paddingHorizontal: 20,
  },

  actionButtonPressed: {
    opacity: 0.7,
  },

  actionText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
