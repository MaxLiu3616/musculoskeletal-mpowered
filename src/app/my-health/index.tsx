import { router } from 'expo-router';
import { Linking } from 'react-native';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { buildPainInsight } from '@/features/insights/InsightCard.data';
import MyHealthScreen from '@/features/my-health/components/MyHealthScreen';
import { useMyHealth } from '@/features/my-health/MyHealthContext';

const painGuideUrl =
  'https://muscha.org/pain-guide/';

export default function MyHealthRoute() {
  const { records } =
    useMyHealth();

  const { startPlan } =
    useCarePlanner();

  const painInsight =
    buildPainInsight(records);

  const openPainHistory = () => {
    router.push({
      pathname:
        '/my-health/tracking',
      params: {
        tab: 'history',
      },
    });
  };

  const openAppointment = () => {
    startPlan(records);

    router.push({
      pathname:
        '/care-planner/appointment',
      params: {
        from: 'my-health',
      },
    });
  };

  const openPainGuide = () => {
    void Linking.openURL(
      painGuideUrl,
    );
  };

  return (
    <MyHealthScreen
      painInsight={painInsight}
      onProfile={() =>
        router.push(
          '/my-health/profile',
        )
      }
      onTracking={() =>
        router.push(
          '/my-health/tracking',
        )
      }
      onPrescriptions={() =>
        router.push(
          '/my-health/prescriptions',
        )
      }
      onCheckPainHistory={
        openPainHistory
      }
      onPlanAppointment={
        openAppointment
      }
      onCheckPainGuide={
        openPainGuide
      }
    />
  );
}