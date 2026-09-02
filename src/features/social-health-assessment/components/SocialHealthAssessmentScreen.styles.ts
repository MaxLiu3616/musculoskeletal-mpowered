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
    marginBottom: 12,
    marginTop: 9,
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
    backgroundColor: '#FFFFFF',
    borderColor: '#CFC5D7',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 34,
    minWidth: 82,
    paddingHorizontal: 12,
  },

  recordButtonDisabled: {
    backgroundColor: '#F7F4F8',
    borderColor: '#E1DAE6',
  },

  recordButtonPressed: {
    backgroundColor: '#F3ECF7',
  },

  recordButtonText: {
    color: '#514D57',
    fontSize: 12,
    fontWeight: '600',
  },

  recordButtonTextDisabled: {
    color: '#AAA2AF',
  },

  recordArrow: {
    color: '#514D57',
    fontSize: 16,
    marginLeft: 7,
  },
});