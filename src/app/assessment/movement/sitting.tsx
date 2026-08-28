import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementImpactScreen from '@/features/movement-assessment/components/MovementImpactScreen';

export default function MovementSittingRoute() {
  const { responses } = useMovementAssessment();

  if (responses.lifting === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementImpactScreen
      area="sitting"
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/standing')}
      step={5}
    />
  );
}
