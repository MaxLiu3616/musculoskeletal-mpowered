import * as React from 'react';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { Linking } from 'react-native';

import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { personalCareSections } from '@/features/my-health/HealthRecord.data';
import { usePersonalCareAssessment } from '@/features/personal-care/PersonalCareAssessmentContext';
import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import PersonalCareSummaryScreen from '@/features/personal-care/components/PersonalCareSummaryScreen';
import { getAssessmentPeriodLabel, personalCareLivingWellUrl } from '@/features/personal-care/definitions/PersonalCareAssessment.data';

export default function PersonalCareSummaryRoute() {
  const { markAssessmentComplete } = useHomeAssessment();
  const { responses } = usePersonalCareAssessment();
  const { saveAssessment } = useMyHealth();

  useFocusEffect(React.useCallback(() => {
    if (responses.personalCare !== null && responses.sleep !== null) {
      saveAssessment({ type: 'personal-care', sections: personalCareSections(responses), periodLabel: getAssessmentPeriodLabel() });
    }
  }, [responses, saveAssessment]));

  if (responses.personalCare === null || responses.sleep === null) {
    return <Redirect href="/assessment/personal-care" />;
  }

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
