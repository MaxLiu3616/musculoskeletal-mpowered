import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePathname } from 'expo-router';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { Image, Pressable, StyleSheet, View, useWindowDimensions, type Text as NativeText } from 'react-native';

import { AppText as Text } from './typography';
import { measureMorphBox, useAssessmentTransition, type HeaderGeometry } from './motion/AssessmentTransitionContext';
import { homeAssessments } from '@/features/home/components/HomeScreen.data';
import { useSetting } from '@/features/setting/SettingContext';
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
  onTransitionMeasured,
}: {
  title: string;
  onBack?: () => void;
  eyebrow?: string;
  compact?: boolean;
  onTransitionMeasured?: (header: HeaderGeometry) => void;
}) {
  const pathname = usePathname();
  const mountedPath = useRef(pathname).current;
  const { width, height, fontScale } = useWindowDimensions();
  const { display } = useSetting();
  const { reportHeader } = useAssessmentTransition();
  const titleRef = useRef<NativeText>(null);
  const iconRef = useRef<View>(null);
  const assessment = homeAssessments.find(item => title === item.label || title === `${item.label} summary`);
  const measureHeader = useCallback(async () => {
    if (!assessment || (!onTransitionMeasured && pathname !== mountedPath)) return;
    const [titleBox, iconBox] = await Promise.all([measureMorphBox(titleRef.current), measureMorphBox(iconRef.current)]);
    if (!titleBox || !iconBox) return;
    const geometry = { title: titleBox, icon: iconBox, text: title, fontSize: compact ? 32 : 36, lineHeight: compact ? 36 : 40 };
    if (onTransitionMeasured) onTransitionMeasured(geometry);
    else reportHeader(assessment.id, geometry);
  }, [assessment, compact, mountedPath, onTransitionMeasured, pathname, reportHeader, title]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => { void measureHeader(); });
    return () => cancelAnimationFrame(frame);
  }, [display.textSize, fontScale, height, measureHeader, width]);

  return (
    <View onLayout={measureHeader} style={[styles.header, compact && styles.compactHeader]}>
      <View style={[styles.topRow, compact && styles.compactTopRow]}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : <BrandMark />}
        <View style={styles.eyebrowGroup}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          {assessment ? <View ref={iconRef} collapsable={false} style={styles.assessmentIcon}>
            {assessment.id === 'personal-care'
              ? <MaterialCommunityIcons name={assessment.icon} size={28} color={colors.ink} style={styles.iconGlyph} />
              : <Ionicons name={assessment.icon} size={28} color={colors.ink} style={styles.iconGlyph} />}
          </View> : null}
        </View>
      </View>
      <Text ref={titleRef} accessibilityRole="header" style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
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
  eyebrowGroup: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexShrink: 1 },
  assessmentIcon: { width: 28, height: 28 },
  iconGlyph: { lineHeight: 28 },
  title: { color: colors.ink, fontFamily: fonts.display, fontSize: 36, lineHeight: 40, letterSpacing: -0.7 },
  compactHeader: { paddingTop: 10, paddingBottom: 12 },
  compactTopRow: { marginBottom: 6 },
  compactTitle: { fontSize: 32, lineHeight: 36 },
  pressed: { opacity: 0.65 },
});
