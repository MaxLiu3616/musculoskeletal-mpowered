import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { painSections } from '@/features/my-health/HealthRecord.data';
import { getAssessmentPeriodLabel } from '@/features/pain-tracker/definitions/PainAssessment.data';
import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainAssessmentSummaryScreen from '@/features/pain-tracker/components/PainAssessmentSummaryScreen';

export default function PainAssessmentSummaryRoute() {
  const { responses } = usePainAssessment();
  const { saveAssessment } = useMyHealth();

  useFocusEffect(useCallback(() => {
    if (responses.averagePain !== null) {
      saveAssessment({ type: 'pain', sections: painSections(responses), pain: responses, periodLabel: getAssessmentPeriodLabel() });
    }
  }, [responses, saveAssessment]));

  if (responses.averagePain === null) {
    return <Redirect href="/assessment/pain" />;
  }

  const closeAssessment = () => {
    router.dismissTo('/home');
  };

  return (
    <PainAssessmentSummaryScreen
      onBack={() => router.back()}
      onClose={closeAssessment}
    />
  );
}
