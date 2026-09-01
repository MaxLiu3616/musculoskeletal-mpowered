import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  viewport: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
  },
  webViewport: {
    alignSelf: 'center',
    maxWidth: 390,
  },
  keyboardView: {
    flex: 1,
  },
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  content: {
    alignSelf: 'center',
    flexGrow: 1,
    maxWidth: 560,
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
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 4,
  },
  backButtonPressed: {
    backgroundColor: '#F2EEF8',
  },
  backButtonText: {
    color: '#57418D',
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#17151B',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 14,
    marginTop: 8,
  },
  card: {
    borderColor: '#CFC8D3',
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 450,
    padding: 18,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notesLabel: {
    color: '#17151B',
    fontSize: 16,
    fontWeight: '700',
  },
  period: {
    color: '#17151B',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: '#D8D1DC',
    height: 1,
    marginBottom: 16,
    marginTop: 14,
  },
  prompt: {
    color: '#17151B',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  input: {
    borderColor: '#D8D1DC',
    borderRadius: 10,
    borderWidth: 1,
    color: '#17151B',
    fontSize: 15,
    lineHeight: 21,
    marginTop: 16,
    minHeight: 230,
    padding: 14,
    textAlignVertical: 'top',
  },
  actionRow: {
    alignItems: 'flex-end',
    marginTop: 22,
  },
  saveButton: {
    alignItems: 'center',
    borderColor: '#CFC5D8',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 112,
    paddingHorizontal: 18,
  },
  saveButtonPressed: {
    backgroundColor: '#F2EEF8',
  },
  saveButtonText: {
    color: '#4F4B55',
    fontSize: 14,
    fontWeight: '600',
  },
});
