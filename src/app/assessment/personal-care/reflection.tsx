import * as React from 'react';
import {
  Redirect,
  router,
} from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import PersonalCareReflectionScreen from '@/features/personal-care/components/PersonalCareReflectionScreen';

export default function PersonalCareReflectionRoute() {
  const { responses } =
    usePersonalCareAssessment();

  const {
    markAssessmentComplete,
  } = useHomeAssessment();

  if (responses.sleep === null) {
    return (
      <Redirect href="/assessment/personal-care/sleeping" />
    );
  }

  const continueToSummary = () => {
    markAssessmentComplete(
      'personal-care',
    );

    router.push(
      '/assessment/personal-care/summary',
    );
  };

  return (
    <PersonalCareReflectionScreen
      onBack={() =>
        router.back()
      }
      onContinue={
        continueToSummary
      }
    />
  );
}