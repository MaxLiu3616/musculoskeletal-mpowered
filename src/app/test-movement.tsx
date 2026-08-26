import { router } from 'expo-router';

import {
  MovementAssessmentProvider,
} from '@/features/movement-assessment/MovementAssessmentContext';

import MovementStayActiveScreen from '@/features/movement-assessment/components/MovementStayActiveScreen';

export default function TestMovementRoute() {
  return (
    <MovementAssessmentProvider>
      <MovementStayActiveScreen
        onBack={() => router.back()}
        onContinue={() => console.log('Continue pressed')}
      />
    </MovementAssessmentProvider>
  );
}