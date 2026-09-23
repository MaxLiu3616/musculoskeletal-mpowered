import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  webViewport: {
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    minHeight: 246,
    backgroundColor: '#F8DAC6',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    paddingTop: 23,
    paddingHorizontal: 18,
    paddingBottom: 56,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 10,
  },
  brand: {
    color: '#082D6D',
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: -0.8,
  },
  leafMark: {
    width: 28,
    height: 28,
  },
  greeting: {
    color: '#173A70',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,
    maxWidth: '64%',
  },
  heading: {
    color: '#082D6D',
    fontFamily: Platform.select({ ios: 'Georgia', default: 'serif' }),
    fontSize: 41,
    lineHeight: 42,
    letterSpacing: -1.2,
    maxWidth: '65%',
  },
  compactHeading: {
    fontSize: 35,
    lineHeight: 36,
  },
  progressPanel: {
    minHeight: 88,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: '#264A89',
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  progressLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 25,
  },
  progressPeriod: {
    color: '#D8E4F8',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  progressCount: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 19,
    flexShrink: 1,
    textAlign: 'right',
  },
  progressSegments: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 10,
  },
  progressSegment: {
    height: 8,
    flex: 1,
    borderRadius: 3,
    backgroundColor: '#849DC6',
  },
  progressSegmentComplete: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 17,
    paddingTop: 12,
  },
  assessmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  assessmentCard: {
    width: '47%',
    flexGrow: 1,
    minHeight: 116,
    padding: 13,
    borderRadius: 10,
  },
  assessmentIcon: {
    marginBottom: 4,
  },
  assessmentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    marginBottom: 3,
  },
  assessmentTitle: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.4,
    flexShrink: 1,
  },
  assessmentDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  assessmentArrow: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexShrink: 0,
  },
  tileArrow: {
    position: 'absolute',
    right: 0,
    top: -3,
  },
  topTileArrow: {
    position: 'absolute',
    right: 13,
    top: 13,
  },
  managementCard: {
    width: '100%',
    minHeight: 71,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderWidth: 1,
    borderColor: '#EFEAE5',
  },
  managementCopy: {
    flex: 1,
    gap: 3,
  },
  fullTitleRow: {
    paddingRight: 0,
  },
  updatedLabel: {
    fontSize: 10,
    lineHeight: 14,
    marginTop: 6,
  },
  pressed: {
    opacity: 0.72,
  },
  reflection: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    gap: 12,
    marginTop: 14,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DEDBD8',
  },
  reflectionLabel: {
    color: '#082D6D',
    fontSize: 15,
    lineHeight: 20,
    flex: 1,
  },
  reflectionIcon: {
    lineHeight: 26,
  },
  supportedBy: {
    color: '#586B91',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.1,
    textAlign: 'center',
    paddingVertical: 14,
  },
});
