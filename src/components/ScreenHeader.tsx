import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from './typography';
import { colors, fonts } from '@/theme';

export function BrandMark() {
  return (
    <View accessibilityLabel="MPowered" style={styles.brand}>
      <Text style={styles.wordmark}>MPowered</Text>
      <Image
        source={require('../../assets/images/home-leaf-mark.png')}
        accessible={false}
        style={styles.leaf}
      />
    </View>
  );
}

export default function ScreenHeader({
  title,
  onBack,
  eyebrow,
  compact = false,
}: {
  title: string;
  onBack?: () => void;
  eyebrow?: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.header, compact && styles.compactHeader]}>
      <View style={[styles.topRow, compact && styles.compactTopRow]}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : <BrandMark />}
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      </View>
      <Text accessibilityRole="header" style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.peach, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  wordmark: { color: colors.ink, fontFamily: fonts.strong, fontSize: 19, lineHeight: 26, letterSpacing: -0.8 },
  leaf: { width: 26, height: 26 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 44, paddingRight: 12 },
  backText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  eyebrow: { color: colors.muted, fontSize: 11, lineHeight: 16, letterSpacing: 1, textTransform: 'uppercase', flexShrink: 1, textAlign: 'right' },
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 36, lineHeight: 40, letterSpacing: -0.7 },
  compactHeader: { paddingTop: 10, paddingBottom: 12 },
  compactTopRow: { marginBottom: 6 },
  compactTitle: { fontSize: 32, lineHeight: 36 },
  pressed: { opacity: 0.65 },
});
