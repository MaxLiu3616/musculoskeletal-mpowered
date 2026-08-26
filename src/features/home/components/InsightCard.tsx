import { Pressable, Text, View } from 'react-native';

import {
  insightCardCopy,
  type PainInsight,
} from './InsightCard.data';

import PainTrendChart from './PainTrendChart';
import { styles } from './InsightCard.styles';

type InsightCardProps = {
  insight: PainInsight | null;

  onDismiss?: () => void;
  onCheckPainHistory?: () => void;
  onPlanAppointment?: () => void;
  onCheckPainGuide?: () => void;
};

export default function InsightCard({
  insight,
  onDismiss,
  onCheckPainHistory,
  onPlanAppointment,
  onCheckPainGuide,
}: InsightCardProps) {
  if (!insight) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>
          {insightCardCopy.heading}
        </Text>

        <Pressable
          accessibilityLabel={
            insightCardCopy.dismissAccessibilityLabel
          }
          accessibilityRole="button"
          onPress={onDismiss}
          style={({ pressed }) => [
            styles.dismissButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.dismissText}>×</Text>
        </Pressable>
      </View>

      {/* Insight message */}
      <Text style={styles.message}>
        {insight.message}
      </Text>

      {/* White chart card */}
      <View style={styles.chartCard}>
        <View style={styles.chartWrapper}>
          <PainTrendChart data={insight.painTrend} />
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <Pressable
            accessibilityRole="button"
            onPress={onCheckPainHistory}
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionButtonDivider,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.actionText}>
              {insightCardCopy.checkPainHistoryLabel}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onPlanAppointment}
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionButtonDivider,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.actionText}>
              {insightCardCopy.planAppointmentLabel}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onCheckPainGuide}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.actionText}>
              {insightCardCopy.checkPainGuideLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}