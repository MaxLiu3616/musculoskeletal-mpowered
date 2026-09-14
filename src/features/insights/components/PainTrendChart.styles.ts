import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  plotArea: {
    height: 105,
    position: 'relative',
    width: '100%',
  },

  /*
   * Each thin vertical strip makes up
   * the gradient area below the trend.
   */
  areaStrip: {
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
  },

  line: {
    height: 3,
    position: 'absolute',
    zIndex: 3,
  },

  point: {
    borderRadius: 6,
    height: 10,
    position: 'absolute',
    width: 10,
    zIndex: 5,
  },

  valueLabel: {
    color: '#4F4660',
    fontSize: 11,
    fontWeight: '700',
    position: 'absolute',
    textAlign: 'center',
    width: 40,
    zIndex: 6,
  },

  dateContainer: {
    alignItems: 'center',
    position: 'absolute',
  },

  dateText: {
    color: '#5E5865',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});