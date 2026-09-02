import { router } from 'expo-router';

import OtcMedicationScreen from '@/features/management-assessment/components/OtcMedicationScreen';

export default function OtcMedicationRoute() {
  return (
    <OtcMedicationScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/management/exercise')}
    />
  );
}
