import {
  useEffect,
  useState,
} from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import {
  insightCardCopy,
  type PainInsight,
} from '../InsightCard.data';

import PainTrendChart from './PainTrendChart';
import { styles } from './InsightCard.styles';

type InsightCardProps = {
  insight: PainInsight | null;

  showEmptyState?: boolean;

  showDismiss?: boolean;

  onDismiss?: () => void;

  onCheckPainHistory?: () => void;

  onPlanAppointment?: () => void;

  onCheckPainGuide?: () => void;
};

export default function InsightCard({
  insight,
  showEmptyState = false,
  showDismiss = true,
  onDismiss,
  onCheckPainHistory,
  onPlanAppointment,
  onCheckPainGuide,
}: InsightCardProps) {
  const [isDismissed, setIsDismissed] =
    useState(false);

  useEffect(() => {
    setIsDismissed(false);
  }, [insight]);

  if (
    !insight &&
    !showEmptyState
  ) {
    return null;
  }

  if (isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          {insightCardCopy.heading}
        </Text>

        {showDismiss ? (
          <Pressable
            accessibilityLabel={
              insightCardCopy.dismissAccessibilityLabel
            }
            accessibilityRole="button"
            onPress={handleDismiss}
            style={({ pressed }) => [
              styles.dismissButton,
              pressed &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={styles.dismissText}
            >
              ×
            </Text>
          </Pressable>
        ) : null}
      </View>

      {insight ? (
        <Text style={styles.message}>
          {insight.message}
        </Text>
      ) : null}

      <View style={styles.chartCard}>
        {insight ? (
          <View
            style={styles.chartWrapper}
          >
            <PainTrendChart
              data={insight.painTrend}
            />
          </View>
        ) : (
          <View
            style={
              styles.emptyChartContent
            }
          >
            <Text
              style={
                styles.emptyChartText
              }
            >
              Your pain trend insight will
              appear here once enough history
              is available.
            </Text>
          </View>
        )}

        <View
          style={styles.actionsRow}
        >
          <Pressable
            accessibilityRole="button"
            onPress={
              onCheckPainHistory
            }
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionButtonDivider,
              pressed &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={styles.actionText}
            >
              {
                insightCardCopy.checkPainHistoryLabel
              }
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={
              onPlanAppointment
            }
            style={({ pressed }) => [
              styles.actionButton,
              styles.actionButtonDivider,
              pressed &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={styles.actionText}
            >
              {
                insightCardCopy.planAppointmentLabel
              }
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={
              onCheckPainGuide
            }
            style={({ pressed }) => [
              styles.actionButton,
              pressed &&
                styles.buttonPressed,
            ]}
          >
            <Text
              style={styles.actionText}
            >
              {
                insightCardCopy.checkPainGuideLabel
              }
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}