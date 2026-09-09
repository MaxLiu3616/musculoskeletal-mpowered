import * as React from 'react';
import { router } from 'expo-router';
import { Linking } from 'react-native';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import PersonalCareSummaryScreen from '@/features/personal-care/components/PersonalCareSummaryScreen';
import { personalCareLivingWellUrl } from '@/features/personal-care/definitions/PersonalCareAssessment.data';

export default function PersonalCareSummaryRoute() {
  const { markAssessmentComplete } = useHomeAssessment();

  const closeAssessment = () => {
    markAssessmentComplete('personal-care');
    router.dismissTo('/home');
  };

  const openExploreTips = () => {
    void Linking.openURL(personalCareLivingWellUrl);
  };

  return (
    <PersonalCareSummaryScreen
      onBack={() => router.back()}
      onClose={closeAssessment}
      onExploreTips={openExploreTips}
    />
  );
}