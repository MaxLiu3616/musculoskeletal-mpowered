import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },

  scoreRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  scoreLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 8,
  },

  scoreInput: {
    borderBottomColor: colors.muted,
    borderBottomWidth: 1.5,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '600',
    height: 28,
    paddingHorizontal: 2,
    paddingVertical: 0,
    textAlign: 'center',
    width: 52,
  },

  sliderContainer: {
    height: 72,
    marginHorizontal: 4,
    marginTop: 14,
    position: 'relative',
  },

  sliderRail: {
    left: 5,
    position: 'absolute',
    right: 5,
    top: 38,
  },

  sliderTrack: {
    backgroundColor: colors.sky,
    borderRadius: 6,
    height: 12,
    overflow: 'hidden',
  },

  sliderTrackFill: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: 12,
  },

  sliderInput: {
    bottom: 0,
    left: -8,
    opacity: 0.001,
    position: 'absolute',
    right: -8,
    top: 10,
  },

  valueBubble: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: 24,
    justifyContent: 'center',
    minWidth: 28,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 0,
  },

  valueBubbleText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },

  thumbBar: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    height: 28,
    position: 'absolute',
    top: 28,
    width: 10,
  },

  description: {
    color: colors.ink,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 4,
    textAlign: 'center',
  },
});
