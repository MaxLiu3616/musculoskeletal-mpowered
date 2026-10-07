import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import MotionPressable, { MotionArrow } from '@/components/motion/MotionPressable';

import { AppText as Text } from '@/components/typography';
import InsightCard from '@/features/insights/components/InsightCard';
import type { PainInsight } from '@/features/insights/InsightCard.data';
import { colors } from '@/theme';
import { useMyHealth } from '../MyHealthContext';
import { myHealthCopy } from '../MyHealth.data';
import HealthScreen from './HealthScreen';
import { styles } from './MyHealthScreen.styles';

type MyHealthScreenProps = {
  onProfile: () => void;
  onTracking: () => void;
  onPrescriptions: () => void;
  painInsight?: PainInsight | null;
  onDismissInsight?: () => void;
  onCheckPainHistory?: () => void;
  onPlanAppointment?: () => void;
  onCheckPainGuide?: () => void;
};

export default function MyHealthScreen({
  onProfile, onTracking, onPrescriptions, painInsight = null,
  onCheckPainHistory, onPlanAppointment, onCheckPainGuide,
}: MyHealthScreenProps) {
  const { records, prescriptions } = useMyHealth();
  const completedTypes = new Set(records.map((record) => record.type)).size;
  return (
    <HealthScreen title="My Health" animateEntrance>
      <View style={styles.profileHero}>
        <View style={styles.titleRow}>
          <Ionicons name="body-outline" size={34} color={colors.surface} />
          <Text style={styles.profileStatus}>{completedTypes} of 5 assessments</Text>
        </View>
        <Text style={styles.profileTitle}>Your pain profile.</Text>
        <Text style={styles.profileDescription}>
          {records.length ? myHealthCopy.profileDescription : myHealthCopy.profileEmpty}
        </Text>
        {records[0] ? (
          <Text style={styles.profileStatus}>
            Updated {new Date(records[0].completedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
          </Text>
        ) : null}
        <MotionPressable accessibilityRole="button" accessibilityLabel="View pain profile" onPress={onProfile}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
          <Text style={styles.profileButtonText}>{completedTypes === 5 ? 'View your profile' : 'View profile'}</Text>
          <MotionArrow><Ionicons name="arrow-forward" size={21} color={colors.ink} /></MotionArrow>
        </MotionPressable>
      </View>

      <View style={styles.navigationGrid}>
        <MotionPressable accessibilityRole="button" accessibilityLabel="Health history" onPress={onTracking}
          style={({ pressed }) => [styles.navigationTile, styles.historyTile, pressed && styles.pressed]}>
          <View style={styles.titleRow}>
            <Ionicons name="pulse-outline" size={30} color={colors.ink} />
            <MotionArrow><Ionicons name="arrow-forward" size={19} color={colors.ink} /></MotionArrow>
          </View>
          <Text style={styles.navigationTitle}>History</Text>
          <Text style={styles.navigationDescription}>{records.length} saved check-ins</Text>
        </MotionPressable>
        <MotionPressable accessibilityRole="button" accessibilityLabel="Prescriptions" onPress={onPrescriptions}
          style={({ pressed }) => [styles.navigationTile, styles.prescriptionTile, pressed && styles.pressed]}>
          <View style={styles.titleRow}>
            <Ionicons name="medkit-outline" size={30} color={colors.ink} />
            <MotionArrow><Ionicons name="arrow-forward" size={19} color={colors.ink} /></MotionArrow>
          </View>
          <Text style={styles.navigationTitle}>Prescriptions</Text>
          <Text style={styles.navigationDescription}>{prescriptions.length} medications</Text>
        </MotionPressable>
      </View>

      <View style={styles.insightSection}>
        <InsightCard insight={painInsight} showEmptyState showDismiss={false}
          onCheckPainHistory={onCheckPainHistory} onPlanAppointment={onPlanAppointment}
          onCheckPainGuide={onCheckPainGuide} />
      </View>
    </HealthScreen>
  );
}
