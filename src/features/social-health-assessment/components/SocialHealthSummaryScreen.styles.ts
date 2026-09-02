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
    flexGrow: 1,
    maxWidth: 560,
    paddingBottom: 28,
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
    color: '#514D57',
    fontSize: 12,
    fontWeight: '500',
  },

  trackerTitle: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
  },

  screenTitle: {
    color: '#17151B',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    marginTop: 8,
  },

  helper: {
    color: '#6C6472',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8C1CC',
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },

  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTitle: {
    color: '#17151B',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },

  period: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 12,
    textAlign: 'right',
  },

  divider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginBottom: 18,
    marginTop: 10,
  },

  sectionTitle: {
    color: '#17151B',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },

  summaryPanel: {
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
  },

  summaryMessageArea: {
    alignItems: 'center',
    backgroundColor: '#F1F1F3',
    paddingBottom: 18,
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  summaryMessage: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },

  summaryEmphasis: {
    fontWeight: '700',
  },

  tipsButton: {
    alignItems: 'center',
    backgroundColor: '#B9B9BC',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 12,
  },

  tipsButtonPressed: {
    opacity: 0.78,
  },

  tipsButtonText: {
    color: '#342E3A',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 7,
    textAlign: 'center',
  },

  resultsTitle: {
    color: '#17151B',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 22,
  },

  resultGroup: {
    marginLeft: 14,
    marginTop: 16,
  },

  resultLabel: {
    color: '#514D57',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
  },

  resultText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 3,
  },

  reflectionGroup: {
    marginTop: 26,
  },

  reflectionLabel: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },

  reflectionText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginLeft: 14,
    marginTop: 8,
  },

  closeRow: {
    alignItems: 'center',
    borderTopColor: '#D5CFD8',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingTop: 18,
  },

  savedText: {
    color: '#817B83',
    fontSize: 11,
    fontWeight: '500',
  },

  closeButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#CFC5D7',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 38,
    minWidth: 100,
    paddingHorizontal: 20,
  },

  closeButtonPressed: {
    backgroundColor: '#F3ECF7',
  },

  closeButtonText: {
    color: '#514D57',
    fontSize: 13,
    fontWeight: '600',
  },
});