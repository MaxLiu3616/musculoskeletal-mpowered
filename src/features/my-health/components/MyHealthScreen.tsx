import {
  Pressable,
  Text,
  View,
} from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import InsightCard from '@/features/insights/components/InsightCard';
import type { PainInsight } from '@/features/insights/InsightCard.data';

import { useMyHealth } from '../MyHealthContext';
import { myHealthCopy } from '../MyHealth.data';

import HealthScreen from './HealthScreen';
import { styles } from './MyHealthScreen.styles';

type MyHealthScreenProps = {
  onProfile: () => void;

  onTracking: () => void;

  onPrescriptions: () => void;

  onHome: () => void;

  onCarePlanner: () => void;

  painInsight?: PainInsight | null;

  onDismissInsight?: () => void;

  onCheckPainHistory?: () => void;

  onPlanAppointment?: () => void;

  onCheckPainGuide?: () => void;
};

export default function MyHealthScreen({
  onProfile,
  onTracking,
  onPrescriptions,
  onHome,
  onCarePlanner,
  painInsight = null,
  onCheckPainHistory,
  onPlanAppointment,
  onCheckPainGuide,
}: MyHealthScreenProps) {
  const { records } =
    useMyHealth();

  const profileReady =
    new Set(
      records.map(
        (record) =>
          record.type,
      ),
    ).size === 5;

  return (
    <HealthScreen
      title={myHealthCopy.title}
      footer={
        <BottomNavigation
          activeItem="my-health"
          onItemPress={(id) => {
            if (
              id ===
              'pain-tracker'
            ) {
              onHome();
            }

            if (
              id ===
              'care-planner'
            ) {
              onCarePlanner();
            }
          }}
        />
      }
    >
      <View style={styles.card}>
        <Text
          style={styles.cardTitle}
        >
          {profileReady
            ? myHealthCopy.profileReady
            : myHealthCopy.profilePending}
        </Text>

        {records[0] ? (
          <Text style={styles.muted}>
            Updated{' '}
            {new Date(
              records[0].completedAt,
            ).toLocaleDateString(
              'en-AU',
              {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              },
            )}
          </Text>
        ) : null}

        <Text
          style={styles.subtitle}
        >
          {records.length
            ? myHealthCopy.profileDescription
            : myHealthCopy.profileEmpty}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onProfile}
          style={({ pressed }) => [
            styles.outlineButton,
            styles.alignEnd,
            pressed &&
              styles.pressed,
          ]}
        >
          <Text
            style={styles.outlineText}
          >
            Open my pain profile
          </Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          onPress={onTracking}
          style={({ pressed }) => [
            styles.secondaryButton,
            styles.column,
            pressed &&
              styles.pressed,
          ]}
        >
          <Text
            style={styles.secondaryText}
          >
            Check my health tracking
            records
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onPrescriptions}
          style={({ pressed }) => [
            styles.secondaryButton,
            styles.column,
            pressed &&
              styles.pressed,
          ]}
        >
          <Text
            style={styles.secondaryText}
          >
            Check my prescriptions
          </Text>
        </Pressable>
      </View>

      <View
        style={styles.insightSection}
      >
        <InsightCard
          insight={painInsight}
          showEmptyState
          showDismiss={false}
          onCheckPainHistory={
            onCheckPainHistory
          }
          onPlanAppointment={
            onPlanAppointment
          }
          onCheckPainGuide={
            onCheckPainGuide
          }
        />
      </View>
    </HealthScreen>
  );
}