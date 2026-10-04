import { colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewport: {
    alignSelf: 'center',
    backgroundColor: colors.canvas,
    overflow: 'hidden',
    width: '100%',
  },

  webViewport: {
    maxWidth: 390,
  },

  safeArea: {
    backgroundColor: colors.canvas,
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

  helper: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 14,
    marginTop: -10,
  },

  summaryCard: {
    backgroundColor: colors.surface,
    borderColor: colors.softBorder,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },

  titleRow: {
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  period: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'right',
  },

  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginBottom: 14,
    marginTop: 9,
  },

  sectionTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },

  scorePanel: {
    backgroundColor: colors.canvas,
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },

  scoreMessage: {
    color: colors.ink,
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
    backgroundColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 12,
  },

  tipsButtonPressed: {
    opacity: 0.82,
  },

  tipsButtonText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },

  resultsSection: {
    marginTop: 20,
  },

  resultsTitle: {
    color: colors.ink,
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
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 17,
  },

  resultText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
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
    backgroundColor: colors.border,
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
    color: colors.muted,
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    marginRight: 12,
  },

  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 100,
    paddingHorizontal: 20,
  },

  closeButtonPressed: {
    backgroundColor: colors.sky,
  },

  closeButtonText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
