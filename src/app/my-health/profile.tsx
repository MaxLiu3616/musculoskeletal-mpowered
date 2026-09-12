import { router } from 'expo-router';

import HealthProfileScreen from '@/features/my-health/components/HealthProfileScreen';

export default function HealthProfileRoute() {
  return <HealthProfileScreen onBack={() => router.dismissTo('/my-health')} />;
}
