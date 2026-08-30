import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5EDF8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: 72,
    paddingBottom: 8,
    paddingHorizontal: 6,
    paddingTop: 6,
    width: '100%',
  },

  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  itemPressed: {
    opacity: 0.7,
  },

  iconContainer: {
    alignItems: 'center',
    borderRadius: 20,
    height: 34,
    justifyContent: 'center',
    marginBottom: 3,
    width: 52,
  },

  iconContainerActive: {
    backgroundColor: '#E7D8FF',
  },

  label: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  labelActive: {
    color: '#4D3A67',
    fontWeight: '700',
  },
});