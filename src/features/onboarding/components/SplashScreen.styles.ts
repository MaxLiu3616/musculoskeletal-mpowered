import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 58,
    justifyContent: 'center',
  },
  logo: {
    height: 48,
    width: 176,
  },
  content: {
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    maxWidth: 480,
    paddingBottom: 18,
    paddingHorizontal: 24,
    paddingTop: 16,
    width: '100%',
  },
  hero: {
    flexGrow: 1,
  },
  gallery: {
    height: 408,
    overflow: 'hidden',
    width: '100%',
  },
  galleryScroll: {
    height: 408,
    width: '100%',
  },
  preview: {
    flexShrink: 0,
    height: 408,
    width: '100%',
  },
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
    justifyContent: 'center',
  },
  dotButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 36,
  },
  dot: {
    backgroundColor: '#DDD8E8',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  activeDot: {
    backgroundColor: '#777777',
    width: 30,
  },
  title: {
    color: '#1E1E1E',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    minHeight: 60,
  },
  actions: {
    marginTop: 18,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#57418D',
    borderRadius: 9,
    height: 50,
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.82,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },
  signInText: {
    color: '#1E1E1E',
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  actionMessage: {
    color: '#57418D',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  supportText: {
    color: '#8A8A8A',
    fontSize: 11,
    textAlign: 'center',
  },
  sponsor: {
    fontWeight: '700',
  },
});
