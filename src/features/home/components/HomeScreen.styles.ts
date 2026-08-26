import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewport: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    width: '100%',
  },

  webViewport: {
    alignSelf: 'center',
    maxWidth: 390,
  },

  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    alignItems: 'center',
    paddingBottom: 60,
    width: '100%',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 42,
    width: '100%',
  },

  greeting: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 18,
  },

  heading: {
    color: '#17151B',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 8,
  },

  subtitle: {
    color: '#4F4B55',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },

  progressTrack: {
    backgroundColor: '#DEDEDE',
    borderRadius: 999,
    height: 8,
    overflow: 'hidden',
    width: '100%',
  },

  progressFill: {
    backgroundColor: '#17151B',
    borderRadius: 999,
    height: '100%',
  },

  taskRemaining: {
    color: '#57418D',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },

  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 6,
  },

  progressLabel: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
  },

  progressCount: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
  },

  assessmentSection: {
    backgroundColor: '#F5F2F8',
    borderRadius: 14,
    padding: 14,
  },

  assessmentSectionTitle: {
    color: '#17151B',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },

  assessmentList: {
    gap: 10,
  },

  assessmentCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  assessmentTextGroup: {
    flex: 1,
    paddingRight: 12,
  },

  assessmentLabel: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '600',
  },

  assessmentUpdatedAt: {
    color: '#77717D',
    fontSize: 10,
    marginTop: 3,
  },

  recordButton: {
    alignItems: 'center',
    borderColor: '#D8D1DE',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minWidth: 92,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  recordButtonPressed: {
    opacity: 0.7,
  },

  recordButtonText: {
    color: '#4F4B55',
    fontSize: 13,
    fontWeight: '600',
  },

  recordArrow: {
    color: '#4F4B55',
    fontSize: 18,
    lineHeight: 18,
  },

  reflectionButton: {
    alignItems: 'center',
    backgroundColor: '#F5F2F8',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 14,
    minHeight: 48,
    paddingHorizontal: 16,
  },

  reflectionButtonPressed: {
    opacity: 0.75,
  },

  reflectionPlus: {
    color: '#563B9F',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 8,
  },

  reflectionText: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '600',
  },

  supportedBy: {
    color: '#17151B',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 24,
    textAlign: 'center',
  },
});