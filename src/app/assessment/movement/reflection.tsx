import { Redirect, router } from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementReflectionScreen from '@/features/movement-assessment/components/MovementReflectionScreen';

export default function MovementReflectionRoute() {
  const { markAssessmentComplete } = useHomeAssessment();
  const { responses } = useMovementAssessment();

  if (responses.standing === null) {
    return <Redirect href="/assessment/movement" />;
  }

  const completeMovementAssessment = () => {
    markAssessmentComplete('movement');
    router.push('/assessment/movement/summary');
  };

  return (
    <MovementReflectionScreen
      onBack={() => router.back()}
      onContinue={completeMovementAssessment}
    />
  );
}
