import {
  Redirect,
  router,
  useFocusEffect,
} from 'expo-router';
import { useCallback } from 'react';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { painSections } from '@/features/my-health/HealthRecord.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainAssessmentSummaryScreen from '@/features/pain-tracker/components/PainAssessmentSummaryScreen';

export default function PainAssessmentSummaryRoute() {
  const { responses } =
    usePainAssessment();

  const { saveAssessment } =
    useMyHealth();

  const {
    cycleStart,
    cyclePeriodLabel,
  } = useHomeAssessment();

  useFocusEffect(
    useCallback(() => {
      if (
        responses.averagePain !== null &&
        cycleStart &&
        cyclePeriodLabel
      ) {
        saveAssessment(
          {
            type: 'pain',
            sections:
              painSections(responses),
            pain: responses,
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
    responses.averagePain === null
  ) {
    return (
      <Redirect href="/assessment/pain" />
    );
  }

  const closeAssessment = () => {
    router.dismissTo('/home');
  };

  return (
    <PainAssessmentSummaryScreen
      periodLabel={
        cyclePeriodLabel ?? ''
      }
      onBack={() =>
        router.back()
      }
      onClose={
        closeAssessment
      }
    />
  );
}