import { Linking } from 'react-native';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { managementSections } from '@/features/my-health/HealthRecord.data';
import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import ManagementSummaryScreen from '@/features/management-assessment/components/ManagementSummaryScreen';
import { getManagementPeriodLabel, managementPainTipsUrl } from '@/features/management-assessment/definitions/ManagementAssessment.data';

export default function ManagementSummaryRoute() {
  const { responses } = useManagementAssessment();
  const { saveAssessment } = useMyHealth();

  useFocusEffect(useCallback(() => {
    if (responses.exerciseFrequency) {
      saveAssessment({ type: 'management', sections: managementSections(responses), periodLabel: getManagementPeriodLabel() });
    }
  }, [responses, saveAssessment]));

  if (!responses.exerciseFrequency) {
    return <Redirect href="/assessment/management" />;
  }

  return (
    <ManagementSummaryScreen
      onBack={() => router.back()}
      onClose={() => router.dismissTo('/home')}
      onExploreTips={() => void Linking.openURL(managementPainTipsUrl)}
    />
  );
}
