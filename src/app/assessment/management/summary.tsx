import {
  Redirect,
  router,
  useFocusEffect,
} from 'expo-router';
import { Linking } from 'react-native';
import { useCallback } from 'react';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { managementSections } from '@/features/my-health/HealthRecord.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import ManagementSummaryScreen from '@/features/management-assessment/components/ManagementSummaryScreen';
import { managementPainTipsUrl } from '@/features/management-assessment/definitions/ManagementAssessment.data';

export default function ManagementSummaryRoute() {
  const { responses } =
    useManagementAssessment();

  const { saveAssessment } =
    useMyHealth();

  const {
    cycleStart,
    cyclePeriodLabel,
  } = useHomeAssessment();

  useFocusEffect(
    useCallback(() => {
      if (
        responses.exerciseFrequency &&
        cycleStart &&
        cyclePeriodLabel
      ) {
        saveAssessment(
          {
            type: 'management',
            sections:
              managementSections(
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
    !responses.exerciseFrequency
  ) {
    return (
      <Redirect href="/assessment/management" />
    );
  }

  return (
    <ManagementSummaryScreen
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
          managementPainTipsUrl,
        )
      }
    />
  );
}