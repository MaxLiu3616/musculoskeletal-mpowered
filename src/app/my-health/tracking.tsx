import { router } from 'expo-router';

import HealthTrackingScreen from '@/features/my-health/components/HealthTrackingScreen';

export default function HealthTrackingRoute() {
  return <HealthTrackingScreen
    onBack={() => router.dismissTo('/my-health')}
    onRecord={(id) => router.push({ pathname: '/my-health/records/[id]', params: { id } })}
    onAssessment={() => router.push('/assessment/pain')}
  />;
}
