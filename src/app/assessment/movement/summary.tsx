import { Linking } from 'react-native';
import { Redirect, router } from 'expo-router';

import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementSummaryScreen from '@/features/movement-assessment/components/MovementSummaryScreen';
import { movementExerciseUrl } from '@/features/movement-assessment/definitions/MovementAssessment.data';

export default function MovementSummaryRoute() {
  const { responses } = useMovementAssessment();

  if (responses.reflection === null) {
    return <Redirect href="/assessment/movement" />;
  }

  return (
    <MovementSummaryScreen
      onBack={() => router.back()}
      onClose={() => router.dismissTo('/home')}
      onExploreTips={() => void Linking.openURL(movementExerciseUrl)}
    />
  );
}
