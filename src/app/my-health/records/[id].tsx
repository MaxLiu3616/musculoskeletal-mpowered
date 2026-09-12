import { router, useLocalSearchParams } from 'expo-router';

import HealthRecordScreen from '@/features/my-health/components/HealthRecordScreen';

export default function HealthRecordRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <HealthRecordScreen id={id} onBack={() => router.dismissTo('/my-health/tracking')} />;
}
