import { Linking } from 'react-native';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { movementSections } from '@/features/my-health/HealthRecord.data';
import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementSummaryScreen from '@/features/movement-assessment/components/MovementSummaryScreen';
import { movementExerciseUrl } from '@/features/movement-assessment/definitions/MovementAssessment.data';

export default function MovementSummaryRoute() {
  const { responses } = useMovementAssessment();
  const { saveAssessment } = useMyHealth();

  useFocusEffect(useCallback(() => {
    if (responses.reflection !== null) {
      saveAssessment({ type: 'movement', sections: movementSections(responses) });
    }
  }, [responses, saveAssessment]));

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
