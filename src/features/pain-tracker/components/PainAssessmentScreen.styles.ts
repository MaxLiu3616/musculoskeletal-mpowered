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
    padding: 12,
  },

  questionCardFull: {
    flex: 1,
  },

  questionCardCompact: {
    minHeight: 360,
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
    marginBottom: 15,
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
    marginTop: 5,
  },

  optionsScroll: {
    backgroundColor: '#FBF3FC',
    borderRadius: 6,
    flexGrow: 0,
    height: 378,
    maxHeight: 378,
    marginTop: 18,
  },

  options: {
    paddingHorizontal: 4,
  },

  option: {
    alignItems: 'center',
    borderBottomColor: '#D9D0DE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  optionPressed: {
    backgroundColor: '#F1E4F7',
  },

  checkbox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#514D57',
    borderRadius: 3,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    marginLeft: 'auto',
    pointerEvents: 'none',
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

  optionText: {
    color: '#17151B',
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
    paddingRight: 14,
  },

  optionTextSelected: {
    color: '#514D57',
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

  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(23, 21, 27, 0.42)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    maxWidth: 330,
    padding: 16,
    width: '88%',
  },

  modalInputContainer: {
    backgroundColor: '#F1EDF4',
    borderBottomColor: '#5E5862',
    borderBottomWidth: 1,
    minHeight: 104,
    paddingHorizontal: 12,
    paddingTop: 9,
  },

  modalInputLabel: {
    color: '#6A646E',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
  },

  modalInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#17151B',
    fontSize: 13,
    height: 48,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    paddingHorizontal: 0,
    paddingVertical: 4,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },

  modalButton: {
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 64,
    paddingHorizontal: 10,
  },

  modalButtonPressed: {
    backgroundColor: '#F2EEF8',
  },

  modalButtonText: {
    color: '#57418D',
    fontSize: 12,
    fontWeight: '600',
  },

  modalButtonTextDisabled: {
    color: '#9A95A0',
  },

  intensityPromptRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },

  intensityPrompt: {
    color: '#17151B',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },

  intensityInput: {
    borderBottomColor: '#514D57',
    borderBottomWidth: 1.5,
    color: '#17151B',
    fontSize: 13,
    fontWeight: '600',
    height: 28,
    marginLeft: 8,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    paddingHorizontal: 2,
    paddingVertical: 0,
    textAlign: 'center',
    width: 52,
  },

  sliderContainer: {
    height: 72,
    marginHorizontal: 4,
    marginTop: 18,
    position: 'relative',
  },

  sliderRail: {
    left: 5,
    position: 'absolute',
    right: 5,
    top: 38,
  },

  sliderTrack: {
    backgroundColor: '#E8DDF7',
    borderRadius: 6,
    height: 12,
    overflow: 'hidden',
  },

  sliderTrackFill: {
    backgroundColor: '#6D50AC',
    borderRadius: 6,
    height: 12,
  },

  sliderInput: {
    bottom: 0,
    left: -8,
    opacity: 0.001,
    position: 'absolute',
    right: -8,
    top: 10,
  },

  valueBubble: {
    alignItems: 'center',
    backgroundColor: '#6D50AC',
    borderRadius: 2,
    height: 24,
    justifyContent: 'center',
    minWidth: 28,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 0,
  },

  valueBubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  thumbBar: {
    backgroundColor: '#6D50AC',
    borderRadius: 2,
    height: 28,
    position: 'absolute',
    top: 28,
    width: 10,
  },

  painDescription: {
    color: '#17151B',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 4,
    minHeight: 36,
    textAlign: 'center',
  },

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
    marginBottom: 4,
    marginTop: 9,
  },

  summarySection: {
    borderBottomColor: '#D5CFD8',
    borderBottomWidth: 1,
    paddingVertical: 14,
  },

  summarySectionTitle: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  summaryText: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 4,
  },

  summaryItem: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 3,
  },

  summaryValue: {
    fontWeight: '400',
  },

  summaryIntensityItem: {
    marginTop: 8,
  },

  summaryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },

  sessionNote: {
    color: '#817B83',
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 12,
  },

  summaryCloseButton: {
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

  summaryCloseButtonPressed: {
    backgroundColor: '#F3ECF7',
  },

  summaryCloseButtonText: {
    color: '#514D57',
    fontSize: 13,
    fontWeight: '600',
  },
});