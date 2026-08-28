import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementImpactScreen from '@/features/movement-assessment/components/MovementImpactScreen';

export default function MovementLiftingRoute() {
  const { responses } = useMovementAssessment();

  if (responses.walking === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementImpactScreen
      area="lifting"
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/sitting')}
      step={4}
    />
  );
}
