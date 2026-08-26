import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    color: '#57418D',
    fontSize: 15,
    fontWeight: '600',
  },
  trackerTitle: {
    color: '#342E3A',
    fontSize: 14,
    fontWeight: '700',
  },
  assessmentTitle: {
    color: '#17151B',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 14,
    marginTop: 8,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD5E5',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  sectionTitle: {
    color: '#342E3A',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
  },
  divider: {
    backgroundColor: '#E7E0EB',
    height: 1,
    marginBottom: 18,
    marginTop: 12,
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  stepBadge: {
    alignItems: 'center',
    borderColor: '#D8CEE1',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 52,
    paddingHorizontal: 10,
  },
  stepText: {
    color: '#574F5D',
    fontSize: 13,
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
});