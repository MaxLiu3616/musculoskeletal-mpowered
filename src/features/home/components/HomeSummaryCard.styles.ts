import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F2F8',
    borderRadius: 14,
    justifyContent: 'space-between',
    minHeight: 190,
    padding: 18,
    width: 300,
  },

  title: {
    color: '#17151B',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },

  updatedAt: {
    color: '#8A8490',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 14,
  },

  actionButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D7D1DB',
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
    color: '#5E5865',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});