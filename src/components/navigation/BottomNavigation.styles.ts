import { StyleSheet } from 'react-native';
import { colors } from '@/theme';

export const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: colors.canvas, flexDirection: 'row', flexShrink: 0, justifyContent: 'space-around', minHeight: 72, paddingBottom: 8, paddingHorizontal: 6, paddingTop: 6, width: '100%', borderTopWidth: 1, borderTopColor: colors.softBorder },
  item: { alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: 57, paddingBottom: 7 },
  itemPressed: { opacity: 0.7 },
  iconContainer: { alignItems: 'center', height: 34, justifyContent: 'center', marginBottom: 3, width: 52 },
  label: { color: colors.muted, fontSize: 11, fontWeight: '500', textAlign: 'center' },
  labelActive: { color: colors.ink, fontWeight: '600' },
  activeIndicator: { position: 'absolute', bottom: 0, width: 46, height: 3, borderRadius: 2, backgroundColor: colors.primary },
});
