import { Linking } from 'react-native';
import { Redirect, router } from 'expo-router';

import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import ManagementSummaryScreen from '@/features/management-assessment/components/ManagementSummaryScreen';
import { managementPainTipsUrl } from '@/features/management-assessment/definitions/ManagementAssessment.data';

export default function ManagementSummaryRoute() {
  const { responses } = useManagementAssessment();

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
