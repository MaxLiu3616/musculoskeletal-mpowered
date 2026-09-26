import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScreenHeader from './ScreenHeader';
import MotionPressable, { MotionArrow } from './motion/MotionPressable';
import { AppText as Text } from './typography';
import { colors } from '@/theme';

type Props = {
  title: string;
  sectionTitle: string;
  step: number;
  totalSteps: number;
  canRecord: boolean;
  compactCard?: boolean;
  onBack: () => void;
  onRecord: () => void;
  children: ReactNode;
};

export default function AssessmentScreen({
  title, sectionTitle, step, totalSteps, canRecord, onBack, onRecord, children,
}: Props) {
  const { top } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={styles.screen} keyboardVerticalOffset={top}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ScreenHeader title={title} compact eyebrow="Weekly check-in" onBack={() => { Keyboard.dismiss(); onBack(); }} />
        <View style={styles.progress}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Your assessment</Text>
            <Text style={styles.progressCount}>{step} of {totalSteps}</Text>
          </View>
          <View accessibilityRole="progressbar" accessibilityLabel="Assessment progress"
            accessibilityValue={{ min: 0, max: totalSteps, now: step }}
            aria-valuemin={0} aria-valuemax={totalSteps} aria-valuenow={step}
            style={styles.segments}>
            {Array.from({ length: totalSteps }, (_, index) => (
              <View key={index} style={[styles.segment, index < step && styles.segmentActive]} />
            ))}
          </View>
        </View>
        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.questionTitle}>{sectionTitle}</Text>
          <View style={styles.divider} />
          {children}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <MotionPressable accessibilityRole="button" accessibilityLabel={step === totalSteps ? 'View summary' : 'Continue'} accessibilityState={{ disabled: !canRecord }}
          disabled={!canRecord} onPress={() => { Keyboard.dismiss(); onRecord(); }}
          style={({ pressed }) => [styles.button, !canRecord && styles.disabled, pressed && styles.pressed]}>
          <Text style={[styles.buttonText, !canRecord && styles.disabledText]}>
            {step === totalSteps ? 'View summary' : 'Continue'}
          </Text>
          <MotionArrow><Ionicons name="arrow-forward" size={20} color={canRecord ? colors.surface : colors.muted} /></MotionArrow>
        </MotionPressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: { flexGrow: 1, paddingBottom: 12 },
  progress: { marginHorizontal: 17, marginTop: 12, backgroundColor: colors.primary, borderRadius: 12, padding: 12, gap: 8 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  progressText: { color: colors.surface, fontSize: 14, lineHeight: 20, fontWeight: '600', flexShrink: 1 },
  progressCount: { color: colors.sky, fontSize: 13, lineHeight: 20 },
  segments: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 5, borderRadius: 3, backgroundColor: '#849DC6' },
  segmentActive: { backgroundColor: colors.surface },
  card: { backgroundColor: colors.surface, marginHorizontal: 17, marginTop: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.softBorder, padding: 14, flexGrow: 1 },
  questionTitle: { color: colors.ink, fontSize: 19, lineHeight: 26, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.border, marginTop: 8, marginBottom: 10 },
  footer: { backgroundColor: colors.canvas, paddingHorizontal: 17, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.softBorder },
  button: { minHeight: 50, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.primary, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  buttonText: { color: colors.surface, fontSize: 15, lineHeight: 22, fontWeight: '600', flexShrink: 1 },
  disabled: { backgroundColor: colors.sky },
  disabledText: { color: colors.muted },
  pressed: { opacity: 0.75 },
});
