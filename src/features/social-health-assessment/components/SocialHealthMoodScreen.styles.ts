import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center',
  },

  helper: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: 6,
    textAlign: 'center',
  },

  moodRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingHorizontal: 0,
  },

  moodButton: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },

  moodButtonPressed: {
    backgroundColor: colors.sky,
  },

  moodValue: {
    color: colors.muted,
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },

  moodValueSelected: {
    color: colors.ink,
    fontWeight: '700',
  },
});
