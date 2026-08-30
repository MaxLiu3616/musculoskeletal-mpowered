import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementImpactScreen from '@/features/movement-assessment/components/MovementImpactScreen';

export default function MovementStandingRoute() {
  const { responses } = useMovementAssessment();

  if (responses.sitting === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementImpactScreen
      area="standing"
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/reflection')}
      step={6}
    />
  );
}
