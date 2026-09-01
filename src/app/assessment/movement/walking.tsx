import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementImpactScreen from '@/features/movement-assessment/components/MovementImpactScreen';

export default function MovementWalkingRoute() {
  const { responses } = useMovementAssessment();

  if (responses.generalImpacts.length === 0) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementImpactScreen
      area="walking"
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/lifting')}
      step={3}
    />
  );
}
