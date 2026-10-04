import { colors, fonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    accountHero: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 14 },
    accountCopy: { flex: 1, gap: 6 },
    accountName: { color: colors.surface, fontFamily: fonts.display, fontSize: 28, lineHeight: 34 },
    accountDescription: { color: colors.sky, fontSize: 13, lineHeight: 20 },
    settingsMenu: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.softBorder, paddingHorizontal: 14 },
    settingsItem: { flexDirection: 'row', alignItems: 'center', gap: 13, minHeight: 78, paddingVertical: 14 },
    settingsDivider: { borderTopColor: colors.softBorder, borderTopWidth: 1 },
    settingsIcon: { backgroundColor: colors.sky, borderRadius: 12, width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
    peachIcon: { backgroundColor: colors.peach },
    settingsLabel: { flex: 1, color: colors.ink, fontSize: 16, lineHeight: 23, fontWeight: '600' },
    logoutButton: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48, paddingHorizontal: 20, marginTop: 6 },
    logoutLabel: { color: colors.danger, fontSize: 15, lineHeight: 22, fontWeight: '600' },
    pressed: { opacity: 0.7 },
    actionButton: { backgroundColor: colors.primary, borderRadius: 12, minHeight: 48, padding: 14 },
    viewport: { alignSelf: 'center', backgroundColor: colors.canvas, flex: 1, width: '100%' },
    webViewport: { maxWidth: 390 },
    keyboard: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 18, gap: 14 },
    title: {
    fontFamily: fonts.display,
    letterSpacing: -0.5, color: colors.ink, fontSize: 32, fontWeight: '400', lineHeight: 38 },
    subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21 },
    backButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, minHeight: 44 },
    backText: { color: colors.muted, fontSize: 15 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 20, paddingBottom: 24, flexGrow: 1, gap: 16 },
    card: {
    borderColor: colors.softBorder,
    borderWidth: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 18, gap: 14 },
    cardButtonText: { color: colors.surface, fontSize: 15, fontWeight: '600', lineHeight: 22 },
    previewTitle: { color: colors.ink, fontSize: 18, fontWeight: '700', lineHeight: 25 },
    label: { color: colors.ink, fontSize: 13, fontWeight: '600', lineHeight: 18 },
    value: { color: colors.ink, fontSize: 14, lineHeight: 21 },
    muted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
    disabled: { opacity: 0.4 },
    input: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 12, color: colors.ink, fontSize: 15, minHeight: 48, paddingHorizontal: 12, paddingVertical: 12 },
    field: { gap: 8 },
    error: { color: colors.danger, fontSize: 13, lineHeight: 19 },
    row: {
    gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 56, paddingVertical: 14, paddingHorizontal: 4, borderBottomColor: colors.border, borderBottomWidth: 1 },
    rowText: {
    flex: 1,
    flexShrink: 1,
    lineHeight: 22, color: colors.ink, fontSize: 15, fontWeight: '600' },
    deleteText: { color: colors.danger, fontSize: 13, fontWeight: '600' },
    codeInputArea: { height: 58, marginTop: 24, maxWidth: 282, position: 'relative', width: '100%', alignSelf: 'center' },
    codeBoxes: { flexDirection: 'row', gap: 12, height: 58, justifyContent: 'center', pointerEvents: 'none' },
    codeBox: { alignItems: 'center', backgroundColor: colors.sky, borderColor: colors.muted, borderRadius: 7, borderWidth: 1, height: 58, justifyContent: 'center', width: 54 },
    codeBoxActive: { borderColor: colors.primary, borderWidth: 2 },
    codeDigit: { color: colors.ink, fontSize: 22, fontWeight: '600' },
    codeInput: { color: 'transparent', height: 58, left: 0, opacity: 0.02, position: 'absolute', top: 0, width: '100%' },
    greeting: {
    fontFamily: fonts.display,
    lineHeight: 32,
    letterSpacing: -0.5, color: colors.ink, fontSize: 26, fontWeight: '400', marginBottom: 8 },
    assessmentCard: { backgroundColor: colors.sky, borderRadius: 14, padding: 12, gap: 10 },
    assessmentRow: { backgroundColor: colors.surface, borderRadius: 12, minHeight: 56, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 12 },
    assessmentRowText: { color: colors.ink, fontSize: 15, fontWeight: '600', lineHeight: 22 },
    supportSection: {
        gap: 16,
    },

    supportTitle: {
        color: colors.ink,
        fontSize: 17,
        fontWeight: '700',
        lineHeight: 24,
    },

    supportDescription: {
        color: colors.muted,
        fontSize: 14,
        lineHeight: 20,
    },

    contactButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        minHeight: 52,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    contactButtonText: {
        color: colors.surface,
        fontSize: 15,
        fontWeight: '600',
    },
    conditionsSection: {
        marginTop: 32,
        width: '100%',
    },

    conditionsTitle: {
        color: colors.ink,
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 6,
    },

    conditionsHelper: {
        color: colors.muted,
        fontSize: 14,
        lineHeight: 20,
    },

    searchContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        height: 48,
        marginTop: 20,
        maxWidth: 340,
        paddingLeft: 16,
        width: '100%',
    },

    searchInput: {
        color: colors.ink,
        flex: 1,
        fontSize: 15,
        height: '100%',
        paddingRight: 8,
    },

    clearSearchButton: {
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
        width: 44,
    },

    clearSearchButtonPressed: {
        backgroundColor: colors.border,
    },

    clearSearchText: {
        color: colors.primary,
        fontSize: 24,
        lineHeight: 26,
    },

    conditionsList: {
        borderColor: colors.border,
        borderWidth: 1,
        height: 330,
        marginTop: 14,
        maxWidth: 340,
        width: '100%',
        alignSelf: 'center',
    },

    conditionsListContent: {
        paddingBottom: 1,
    },

    conditionOption: {
        backgroundColor: colors.surface,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        justifyContent: 'center',
        minHeight: 44,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    conditionOptionSelected: {
        backgroundColor: colors.primary,
    },

    conditionOptionText: {
        color: colors.ink,
        fontSize: 14,
        lineHeight: 20,
    },

    conditionOptionTextSelected: {
        color: colors.surface,
        fontWeight: '600',
    },

    optionPressed: {
        opacity: 0.82,
    },

    noResults: {
        color: colors.muted,
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 24,
        textAlign: 'center',
    },
});
