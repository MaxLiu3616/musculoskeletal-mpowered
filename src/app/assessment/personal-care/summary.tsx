import * as React from 'react';
import {
  Redirect,
  router,
  useFocusEffect,
} from 'expo-router';
import { Linking } from 'react-native';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { personalCareSections } from '@/features/my-health/HealthRecord.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import PersonalCareSummaryScreen from '@/features/personal-care/components/PersonalCareSummaryScreen';
import { personalCareLivingWellUrl } from '@/features/personal-care/definitions/PersonalCareAssessment.data';

export default function PersonalCareSummaryRoute() {
  const { responses } =
    usePersonalCareAssessment();

  const { saveAssessment } =
    useMyHealth();

  const {
    cycleStart,
    cyclePeriodLabel,
  } = useHomeAssessment();

  useFocusEffect(
    React.useCallback(() => {
      if (
        responses.personalCare !==
          null &&
        responses.sleep !== null &&
        cycleStart &&
        cyclePeriodLabel
      ) {
        saveAssessment(
          {
            type: 'personal-care',
            sections:
              personalCareSections(
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
    responses.personalCare ===
      null ||
    responses.sleep === null
  ) {
    return (
      <Redirect href="/assessment/personal-care" />
    );
  }

  const closeAssessment = () => {
    router.dismissTo('/home');
  };

  const openExploreTips = () => {
    void Linking.openURL(
      personalCareLivingWellUrl,
    );
  };

  return (
    <PersonalCareSummaryScreen
      periodLabel={
        cyclePeriodLabel ?? ''
      }
      onBack={() =>
        router.back()
      }
      onClose={
        closeAssessment
      }
      onExploreTips={
        openExploreTips
      }
    />
  );
}