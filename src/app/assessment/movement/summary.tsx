import {
  Redirect,
  router,
  useFocusEffect,
} from 'expo-router';
import { Linking } from 'react-native';
import { useCallback } from 'react';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { movementSections } from '@/features/my-health/HealthRecord.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { useMovementAssessment } from '@/features/movement-assessment/MovementAssessmentContext';
import MovementSummaryScreen from '@/features/movement-assessment/components/MovementSummaryScreen';
import { movementExerciseUrl } from '@/features/movement-assessment/definitions/MovementAssessment.data';

export default function MovementSummaryRoute() {
  const { responses } =
    useMovementAssessment();

  const { saveAssessment } =
    useMyHealth();

  const {
    cycleStart,
    cyclePeriodLabel,
  } = useHomeAssessment();

  useFocusEffect(
    useCallback(() => {
      if (
        responses.reflection !== null &&
        cycleStart &&
        cyclePeriodLabel
      ) {
        saveAssessment(
          {
            type: 'movement',
            sections:
              movementSections(
                responses,
              ),
            periodLabel:
              cyclePeriodLabel,
          },
          cycleStart,
        );
      }
    }, [
      responses,
      saveAssessment,
      cycleStart,
      cyclePeriodLabel,
    ]),
  );

  if (
    responses.reflection === null
  ) {
    return (
      <Redirect href="/assessment/movement" />
    );
  }

  return (
    <MovementSummaryScreen
      periodLabel={
        cyclePeriodLabel ?? ''
      }
      onBack={() =>
        router.back()
      }
      onClose={() =>
        router.dismissTo('/home')
      }
      onExploreTips={() =>
        void Linking.openURL(
          movementExerciseUrl,
        )
      }
    />
  );
}