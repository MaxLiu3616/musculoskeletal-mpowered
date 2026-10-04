import { colors, fonts } from '@/theme';
import {
  StyleSheet,
} from 'react-native';

export const styles =
  StyleSheet.create({
    profileHero: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, gap: 12 },
    profileTitle: { color: colors.surface, fontFamily: fonts.display, fontSize: 29, lineHeight: 34 },
    profileDescription: { color: colors.surface, fontSize: 14, lineHeight: 21 },
    profileStatus: { color: colors.sky, fontSize: 12, lineHeight: 18 },
    profileButton: { backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 4 },
    profileButtonText: { color: colors.ink, fontSize: 15, lineHeight: 22, fontWeight: '600', flexShrink: 1 },
    navigationGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    navigationTile: { flex: 1, minWidth: 160, minHeight: 132, borderRadius: 14, padding: 15, gap: 8 },
    historyTile: { backgroundColor: colors.sky },
    prescriptionTile: { backgroundColor: colors.peach },
    navigationTitle: { color: colors.ink, fontSize: 16, lineHeight: 22, fontWeight: '600' },
    navigationDescription: { color: colors.ink, fontSize: 12, lineHeight: 18 },
    viewport: {
      backgroundColor: colors.canvas,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },

    webViewport: {
      alignSelf: 'center',
      maxWidth: 390,
    },

    keyboard: {
      flex: 1,
    },

    subtitle: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 21,
    },

    titleRow: {
    flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      gap: 8,
    },

    scroll: {
      flex: 1,
    },

    content: {
    paddingTop: 18,
      paddingHorizontal: 17,
      paddingBottom: 24,
      flexGrow: 1,
      gap: 14,
    },

    card: {
    borderColor: colors.softBorder,
    borderWidth: 1,
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 18,
      gap: 14,
    },

    cardTitle: {
      color: colors.ink,
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 24,
    },

    divider: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },

    row: {
      flexDirection: 'row',
      gap: 12,
    },

    column: {
      flex: 1,
      gap: 8,
    },

    insightSection: {
      flexGrow: 0,
      justifyContent: 'flex-end',
      marginTop: 4,
      paddingBottom: 0,
    },

    label: {
      color: colors.ink,
      fontSize: 13,
      fontWeight: '600',
      lineHeight: 18,
    },

    value: {
      color: colors.ink,
      fontSize: 14,
      lineHeight: 21,
    },

    result: {
      gap: 5,
    },

    muted: {
      color: colors.muted,
      fontSize: 12,
      lineHeight: 18,
    },

    sessionNote: {
      color: colors.muted,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 6,
    },

    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      minHeight: 48,
      paddingHorizontal: 20,
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },

    primaryText: {
      color: colors.surface,
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
    },

    secondaryButton: {
      backgroundColor: colors.sky,
      borderRadius: 14,
      minHeight: 48,
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },

    secondaryText: {
      color: colors.ink,
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 20,
    },

    outlineButton: {
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      minHeight: 48,
      paddingHorizontal: 16,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    outlineText: {
      color: colors.ink,
      fontSize: 13,
      fontWeight: '600',
    },

    pressed: {
      opacity: 0.7,
    },

    disabled: {
      opacity: 0.4,
    },

    empty: {
      flex: 1,
      minHeight: 270,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      padding: 16,
    },

    emptyTitle: {
      color: colors.muted,
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
    },

    centered: {
      textAlign: 'center',
    },

    footer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.canvas,
    },

    prescriptionList: {
    backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 14,
      flexGrow: 0,
    },

    prescriptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      paddingVertical: 14,
      gap: 4,
    },

    prescriptionText: {
      flex: 1,
      gap: 5,
    },

    iconButton: {
      minWidth: 44,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },

    deleteText: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: '600',
    },

    input: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      color: colors.ink,
      fontSize: 15,
      minHeight: 48,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },

    selectButton: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      gap: 8,
    },

    field: {
      gap: 8,
    },

    formSection: {
      marginTop: 10,
      gap: 18,
    },

    modalBackdrop: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.overlay,
      padding: 24,
    },

    modalCard: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      maxHeight: '80%',
      padding: 20,
      gap: 12,
      width: '100%',
      maxWidth: 390,
      alignSelf: 'center',
    },

    option: {
      minHeight: 48,
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      borderRadius: 8,
    },

    selectedOption: {
      backgroundColor: colors.sky,
    },

    tabs: {
      flexDirection: 'row',
      backgroundColor: colors.canvas,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },

    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor:
        'transparent',
    },

    activeTab: {
      borderBottomColor: colors.primary,
    },

    tabText: {
      color: colors.muted,
      fontSize: 14,
    },

    activeTabText: {
      color: colors.primary,
      fontWeight: '600',
    },

    metricTabs: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      overflow: 'hidden',
    },

    metricTab: {
      flex: 1,
      minHeight: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },

    metricSelected: {
      backgroundColor: colors.sky,
    },

    table: {
      borderColor: colors.border,
      borderWidth: 1,
    },

    tableRow: {
      flexDirection: 'row',
      minHeight: 44,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      alignItems: 'center',
    },

    tableDate: {
      flex: 1.5,
      padding: 8,
      fontSize: 11,
      color: colors.muted,
    },

    tableCell: {
      flex: 1,
      textAlign: 'center',
      paddingVertical: 8,
      fontSize: 12,
      color: colors.ink,
    },

    toast: {
      backgroundColor: colors.sky,
      borderRadius: 10,
      padding: 12,
    },

    weekButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      minHeight: 52,
      paddingVertical: 12,
    },

    historyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      gap: 8,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      paddingVertical: 16,
    },

    error: {
      color: colors.danger,
      fontSize: 13,
      lineHeight: 19,
    },

    exportRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
  });
