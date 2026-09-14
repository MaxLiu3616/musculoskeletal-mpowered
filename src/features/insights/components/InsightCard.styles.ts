import {
  StyleSheet,
} from 'react-native';

export const styles =
  StyleSheet.create({
    container: {
      backgroundColor: '#F5F2F8',
      marginBottom: 0,
      paddingBottom: 30,
      paddingHorizontal: 16,
      paddingTop: 50,
    },

    header: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent:
        'space-between',
    },

    heading: {
      color: '#17151B',
      flex: 1,
      fontSize: 16,
      fontStyle: 'italic',
      fontWeight: '700',
      lineHeight: 21,
      paddingRight: 12,
      transform: [{ translateY: -30 }],
    },

    dismissButton: {
      alignItems: 'center',
      height: 28,
      justifyContent: 'center',
      width: 28,
    },

    dismissText: {
      color: '#17151B',
      fontSize: 25,
      fontWeight: '400',
      lineHeight: 26,
    },

    message: {
      color: '#17151B',
      fontSize: 13,
      fontWeight: '700',
      lineHeight: 18,
      marginBottom: 0,
      marginTop: 12,
    },

    chartCard: {
      backgroundColor: '#FFFFFF',
      borderColor: '#D9D5DE',
      borderRadius: 12,
      borderWidth: 1,
      marginTop: 18,
      overflow: 'hidden',
    },

    chartWrapper: {
      paddingHorizontal: 10,
      paddingTop: 10,
    },

    emptyChartContent: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 155,
      paddingHorizontal: 24,
      paddingVertical: 14,
    },

    emptyChartText: {
      color: '#5E5865',
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 19,
      textAlign: 'center',
    },

    actionsRow: {
      borderTopColor: '#D9D5DE',
      borderTopWidth: 1,
      flexDirection: 'row',
      width: '100%',
    },

    actionButton: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      minHeight: 62,
      paddingHorizontal: 8,
      paddingVertical: 9,
    },

    actionButtonDivider: {
      borderRightColor: '#D9D5DE',
      borderRightWidth: 1,
    },

    actionText: {
      color: '#5E5865',
      fontSize: 11,
      fontWeight: '600',
      lineHeight: 14,
      textAlign: 'center',
    },

    buttonPressed: {
      opacity: 0.65,
    },
  });