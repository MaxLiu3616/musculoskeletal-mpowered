import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    alignSelf: 'center',
    maxWidth: 560,
    paddingBottom: 32,
    paddingHorizontal: 20,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 8,
  },
  backButtonPressed: {
    backgroundColor: '#F2EEF8',
  },
  backButtonText: {
    color: '#57418D',
    fontSize: 15,
    fontWeight: '600',
  },
  trackerTitle: {
    color: '#342E3A',
    fontSize: 14,
    fontWeight: '700',
  },
  screenTitle: {
    color: '#17151B',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 6,
    marginTop: 8,
  },
  helper: {
    color: '#5E5862',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  summaryCard: {
    borderColor: '#DDD5E5',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#342E3A',
    fontSize: 18,
    fontWeight: '700',
  },
  period: {
    color: '#5E5862',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: '#E7E0EB',
    height: 1,
    marginVertical: 14,
  },
  sectionTitle: {
    color: '#342E3A',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  scorePanel: {
    backgroundColor: '#F3F1F5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scoreMessage: {
    color: '#342E3A',
    fontSize: 14,
    lineHeight: 21,
    padding: 16,
    textAlign: 'center',
  },
  scoreEmphasis: {
    fontWeight: '700',
  },
  tipsButton: {
    alignItems: 'center',
    backgroundColor: '#D4CED8',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  tipsButtonPressed: {
    opacity: 0.78,
  },
  tipsButtonText: {
    color: '#342E3A',
    fontSize: 14,
    fontWeight: '600',
  },
  resultGroup: {
    marginTop: 18,
  },
  resultLabel: {
    color: '#4F4855',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
  },
  resultText: {
    color: '#342E3A',
    fontSize: 14,
    lineHeight: 21,
  },
  closeRow: {
    alignItems: 'center',
    borderTopColor: '#E7E0EB',
    borderTopWidth: 1,
    marginTop: 22,
    paddingTop: 16,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 46,
    paddingHorizontal: 32,
  },
  closeButtonPressed: {
    opacity: 0.82,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
