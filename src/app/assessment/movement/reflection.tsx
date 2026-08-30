import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementReflectionScreen from '@/features/movement-assessment/components/MovementReflectionScreen';

export default function MovementReflectionRoute() {
  const { responses } = useMovementAssessment();

  if (responses.standing === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementReflectionScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/summary')}
    />
  );
}
