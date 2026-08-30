import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementGeneralImpactsScreen from '@/features/movement-assessment/components/MovementGeneralImpactsScreen';

export default function MovementGeneralImpactsRoute() {
  const { responses } = useMovementAssessment();

  if (responses.hoursActiveLastWeek === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementGeneralImpactsScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/movement/walking')}
    />
  );
}
