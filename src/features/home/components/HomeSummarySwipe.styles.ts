import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    width: '100%',
  },

  scrollContent: {
    gap: 12,
    paddingRight: 20,
  },

  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 12,
    paddingLeft: 16,
  },

  dot: {
    backgroundColor: '#C9C4CE',
    borderRadius: 4,
    height: 6,
    width: 6,
  },

  dotActive: {
    backgroundColor: '#8A8490',
    width: 46,
  },
});