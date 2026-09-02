import { router } from 'expo-router';

import MedicationScreen from '@/features/management-assessment/components/MedicationScreen';

export default function MedicationRoute() {
  const returnToPreviousScreen = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/home');
  };

  return (
    <MedicationScreen
      onBack={returnToPreviousScreen}
      onContinue={() => router.push('/assessment/management/otc')}
    />
  );
}
