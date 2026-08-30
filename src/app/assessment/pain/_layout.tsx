import { Stack } from 'expo-router';

import { PainAssessmentProvider } from '@/features/pain-tracker/PainAssessmentContext';

export default function PainAssessmentLayout() {
  return (
    <PainAssessmentProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PainAssessmentProvider>
  );
}
