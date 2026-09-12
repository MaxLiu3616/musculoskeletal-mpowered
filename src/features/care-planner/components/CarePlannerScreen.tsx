import { useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import HealthScreen from '@/features/my-health/components/HealthScreen';

import { useCarePlanner } from '../CarePlannerContext';
import { carePlannerCopy, formatAppointmentDate } from '../CarePlanner.data';
import { styles } from './CarePlanner.styles';
import { CareButton } from './CarePlannerUI';

type Props = { onNew: () => void; onView: (id: string) => void; onHome: () => void; onMyHealth: () => void };

export default function CarePlannerScreen({ onNew, onView, onHome, onMyHealth }: Props) {
  const { plans } = useCarePlanner();
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const openTips = async () => {
    try { await Linking.openURL(carePlannerCopy.painGuideUrl); }
    catch { setError('The pain guide could not be opened. Please try again.'); }
  };
  return <HealthScreen title={carePlannerCopy.title} footer={
    <BottomNavigation activeItem="care-planner" onItemPress={(id) => {
      if (id === 'pain-tracker') onHome();
      if (id === 'my-health') onMyHealth();
    }} />
  }>
    <View style={styles.divider} />
    <Text style={styles.subtitle}>{carePlannerCopy.description}</Text>
    <View style={styles.carousel}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={256} decelerationRate="fast" contentContainerStyle={styles.carouselCards}
        onScroll={(event) => setPage(event.nativeEvent.contentOffset.x > 100 ? 1 : 0)} scrollEventThrottle={100}>
        <View style={styles.entryCard}>
          <Text style={styles.label}>Explore questions generated for me</Text>
          <CareButton label="Prepare for my appointment" outline onPress={onNew} />
        </View>
        <View style={styles.entryCard}>
          <Text style={styles.label}>Explore self-management tips for my ongoing pain</Text>
          <CareButton label="Explore tips" outline onPress={openTips} />
        </View>
      </ScrollView>
      <View style={styles.dots}>{[0, 1].map((index) => <View key={index} style={[styles.dot, page === index && styles.activeDot]} />)}</View>
    </View>
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{plans.length ? 'My Appointments' : 'My Doctor Appointment'}</Text>
      {plans.length ? plans.map((plan) => <View key={plan.id} style={styles.appointmentRow}>
        <View style={styles.flex}>
          <Text style={styles.label}>{plan.doctorName || (plan.service === 'Not specified' ? 'Healthcare appointment' : plan.service)}</Text>
          <Text style={styles.muted}>Date: {formatAppointmentDate(plan.appointmentDate)}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`View appointment on ${formatAppointmentDate(plan.appointmentDate)} with ${plan.doctorName || 'healthcare practitioner'}`} style={styles.outlineButton} onPress={() => onView(plan.id)}>
          <Text style={styles.outlineText}>View →</Text>
        </Pressable>
      </View>) : <Text style={[styles.emptyTitle, styles.centered]}>You have not planned any appointments.</Text>}
      <CareButton label={plans.length ? 'Plan another appointment' : 'Prepare for my appointment'} outline onPress={onNew} />
    </View>
    <Text style={styles.sessionNote}>{carePlannerCopy.sessionNote}</Text>
    <Text style={styles.sponsor}>Supported by ABBVIE</Text>
  </HealthScreen>;
}
