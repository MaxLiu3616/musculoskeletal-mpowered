import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  question: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    textAlign: 'center',
  },

  helper: {
    color: '#817B83',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 6,
    textAlign: 'center',
  },

  moodRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingHorizontal: 16,
  },

  moodButton: {
    alignItems: 'center',
    borderRadius: 22,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },

  moodButtonPressed: {
    backgroundColor: '#F5F0F8',
  },

  moodValue: {
    color: '#8E8891',
    fontSize: 11,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 16,
    marginTop: 8,
    textAlign: 'center',
  },

  moodValueSelected: {
    color: '#17151B',
    fontWeight: '700',
  },
});