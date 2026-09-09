import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewport: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    width: '100%',
  },

  webViewport: {
    maxWidth: 390,
  },

  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  screen: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
  },

  backButton: {
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: 4,
  },

  backButtonPressed: {
    backgroundColor: '#F5F0F8',
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
    marginBottom: 18,
    marginTop: 4,
  },

  helper: {
    color: '#6C6472',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
    marginBottom: 14,
    marginTop: -10,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#BEB8C2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },

  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTitle: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  period: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'right',
  },

  divider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginBottom: 14,
    marginTop: 9,
  },

  sectionTitle: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  scorePanel: {
    backgroundColor: '#F3F0F5',
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },

  scoreMessage: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
  },

  scoreEmphasis: {
    fontWeight: '700',
  },

  tipsButton: {
    alignItems: 'center',
    backgroundColor: '#C9C5CA',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
  },

  tipsButtonPressed: {
    opacity: 0.82,
  },

  tipsButtonText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },

  resultsSection: {
    marginTop: 20,
  },

  resultsTitle: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  resultsContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  resultGroup: {
    marginBottom: 16,
  },

  resultLabel: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 17,
  },

  resultText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 2,
  },

  reflectionSection: {
    marginTop: 2,
  },

  reflectionContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  footerDivider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginTop: 10,
  },

  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  savedText: {
    color: '#817B83',
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 12,
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