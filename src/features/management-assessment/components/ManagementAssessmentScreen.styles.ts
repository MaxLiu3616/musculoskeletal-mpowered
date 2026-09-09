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

  keyboardView: {
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

  assessmentTitle: {
    color: '#17151B',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    marginBottom: 18,
    marginTop: 4,
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#BEB8C2',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },

  sectionTitle: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  divider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginBottom: 12,
    marginTop: 9,
  },

  prompt: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  helper: {
    color: '#6C6472',
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 16,
    marginTop: 6,
  },

  sourceLabel: {
    color: '#17151B',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 17,
    marginTop: 14,
  },

  medicationList: {
    backgroundColor: '#FBF3FC',
    borderRadius: 6,
    flexGrow: 0,
    height: 250,
    marginTop: 12,
    maxHeight: 250,
    overflow: 'hidden',
  },

  medicationOption: {
    alignItems: 'center',
    borderBottomColor: '#D9D0DE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  optionPressed: {
    backgroundColor: '#F1E4F7',
  },

  medicationTextGroup: {
    flex: 1,
    paddingRight: 14,
  },

  medicationName: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  medicationSchedule: {
    color: '#6C6472',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 1,
  },

  checkbox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#514D57',
    borderRadius: 3,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  checkboxSelected: {
    backgroundColor: '#6D50AC',
    borderColor: '#6D50AC',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
  },

  textArea: {
    borderColor: '#D5CFD8',
    borderRadius: 8,
    borderWidth: 1,
    color: '#17151B',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
    minHeight: 170,
    padding: 12,
    textAlignVertical: 'top',
  },

  choiceList: {
    backgroundColor: '#FBF3FC',
    borderRadius: 6,
    marginTop: 18,
    overflow: 'hidden',
  },

  choiceOption: {
    alignItems: 'center',
    borderBottomColor: '#D9D0DE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 10,
  },

  radio: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#514D57',
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    marginRight: 12,
    width: 18,
  },

  radioSelected: {
    borderColor: '#6D50AC',
  },

  radioDot: {
    backgroundColor: '#6D50AC',
    borderRadius: 4,
    height: 8,
    width: 8,
  },

  choiceLabel: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 18,
  },

  stepBadge: {
    alignItems: 'center',
    borderColor: '#CFC6D5',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 30,
    minWidth: 38,
    paddingHorizontal: 7,
  },

  stepText: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '600',
  },

  recordButton: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 112,
    paddingHorizontal: 18,
  },

  recordButtonDisabled: {
    backgroundColor: '#E7D8FF',
  },

  recordButtonPressed: {
    opacity: 0.82,
  },

  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  recordButtonTextDisabled: {
    color: '#554766',
  },

  // Summary
  summaryScrollContent: {
    flexGrow: 1,
  },

  summaryScreen: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    width: '100%',
  },

  summaryIntro: {
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

  summaryTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryCardTitle: {
    color: '#17151B',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  summaryPeriod: {
    color: '#514D57',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'right',
  },

  summaryDivider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginBottom: 14,
    marginTop: 9,
  },

  summarySectionTitle: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  overviewPanel: {
    backgroundColor: '#F3F0F5',
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },

  overviewText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
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
    marginTop: 3,
  },

  summaryFooterDivider: {
    backgroundColor: '#D5CFD8',
    height: 1,
    marginTop: 4,
  },

  summaryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  journalStatus: {
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