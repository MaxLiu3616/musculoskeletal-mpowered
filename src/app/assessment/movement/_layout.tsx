import { Stack } from 'expo-router';

import { MovementAssessmentProvider } from '@/features/movement-assessment/MovementAssessmentContext';

export default function MovementAssessmentLayout() {
  return (
    <MovementAssessmentProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MovementAssessmentProvider>
  );
}
