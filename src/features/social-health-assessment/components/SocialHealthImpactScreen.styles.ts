import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },

  scoreRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  scoreLabel: {
    color: '#17151B',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 8,
  },

  scoreInput: {
    borderBottomColor: '#514D57',
    borderBottomWidth: 1.5,
    color: '#17151B',
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
    backgroundColor: '#E8DDF7',
    borderRadius: 6,
    height: 12,
    overflow: 'hidden',
  },

  sliderTrackFill: {
    backgroundColor: '#6D50AC',
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
    backgroundColor: '#6D50AC',
    borderRadius: 2,
    height: 24,
    justifyContent: 'center',
    minWidth: 28,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 0,
  },

  valueBubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  thumbBar: {
    backgroundColor: '#6D50AC',
    borderRadius: 2,
    height: 28,
    position: 'absolute',
    top: 28,
    width: 10,
  },

  description: {
    color: '#17151B',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 4,
    textAlign: 'center',
  },
});