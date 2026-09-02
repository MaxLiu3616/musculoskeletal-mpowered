import * as React from 'react';
import { Redirect, router } from 'expo-router';

import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import PersonalCareWashingDressingScreen from '@/features/personal-care/components/PersonalCareWashingDressingScreen';

export default function PersonalCareWashingDressingRoute() {
  const { responses } = usePersonalCareAssessment();

  if (responses.generalActivityImpacts.length === 0) {
    return <Redirect href="/assessment/personal-care" />;
  }

  return (
    <PersonalCareWashingDressingScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/personal-care/sleeping')}
    />
  );
}