import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Linking, View } from 'react-native';
import MotionPressable, { MotionArrow } from '@/components/motion/MotionPressable';

import { AppText as Text } from '@/components/typography';
import HealthScreen from '@/features/my-health/components/HealthScreen';
import { colors } from '@/theme';
import { useCarePlanner } from '../CarePlannerContext';
import { carePlannerCopy, formatAppointmentDate } from '../CarePlanner.data';
import { styles } from './CarePlanner.styles';

type Props = { onNew: () => void; onView: (id: string) => void };

export default function CarePlannerScreen({ onNew, onView }: Props) {
  const { plans } = useCarePlanner();
  const [error, setError] = useState('');
  const openTips = async () => {
    try { await Linking.openURL(carePlannerCopy.painGuideUrl); }
    catch { setError('The pain guide could not be opened. Please try again.'); }
  };
  return (
    <HealthScreen title="Care Planner" animateEntrance>
      <View style={styles.planningHero}>
        <Ionicons name="calendar-outline" size={34} color={colors.surface} />
        <Text style={styles.planningTitle}>Make the most{ '\n' }of your visit.</Text>
        <Text style={styles.planningDescription}>Prepare your questions and keep your appointment notes together.</Text>
        <MotionPressable accessibilityRole="button" accessibilityLabel="Plan appointment" onPress={onNew}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
          <Text style={styles.profileButtonText}>Plan appointment</Text>
          <MotionArrow><Ionicons name="arrow-forward" size={21} color={colors.ink} /></MotionArrow>
        </MotionPressable>
      </View>

      <MotionPressable accessibilityRole="button" accessibilityLabel="Explore pain-management tips" onPress={openTips}
        style={({ pressed }) => [styles.tipsRow, pressed && styles.pressed]}>
        <Ionicons name="leaf-outline" size={28} color={colors.ink} />
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>Everyday care</Text>
          <Text style={styles.muted}>Explore pain-management tips</Text>
        </View>
        <MotionArrow><Ionicons name="arrow-forward" size={22} color={colors.ink} /></MotionArrow>
      </MotionPressable>
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

      <View style={styles.appointmentsHeading}>
        <Text style={styles.appointmentsTitle}>My appointments</Text>
        <Text style={styles.appointmentCount}>{plans.length}</Text>
      </View>
      {plans.length ? plans.map((plan) => (
        <MotionPressable key={plan.id} accessibilityRole="button"
          accessibilityLabel={`View appointment on ${formatAppointmentDate(plan.appointmentDate)} with ${plan.doctorName || 'healthcare practitioner'}`}
          onPress={() => onView(plan.id)} style={({ pressed }) => [styles.appointmentRow, pressed && styles.pressed]}>
          <Ionicons name="calendar-number-outline" size={27} color={colors.ink} />
          <View style={styles.flex}>
            <Text style={styles.label}>{plan.doctorName || (plan.service === 'Not specified' ? 'Healthcare appointment' : plan.service)}</Text>
            <Text style={styles.muted}>{formatAppointmentDate(plan.appointmentDate)}</Text>
          </View>
          <MotionArrow><Ionicons name="arrow-forward" size={21} color={colors.ink} /></MotionArrow>
        </MotionPressable>
      )) : (
        <View style={styles.appointmentEmpty}>
          <Ionicons name="calendar-clear-outline" size={32} color={colors.muted} />
          <Text style={styles.label}>No appointments yet</Text>
          <Text style={[styles.muted, styles.centered]}>Your plans will appear here.</Text>
        </View>
      )}
      <Text style={styles.sessionNote}>{carePlannerCopy.sessionNote}</Text>
      <Text style={styles.sponsor}>Supported by ABBVIE</Text>
    </HealthScreen>
  );
}
