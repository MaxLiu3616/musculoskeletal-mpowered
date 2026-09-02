import { Stack } from 'expo-router';

import { ManagementAssessmentProvider } from '@/features/management-assessment/ManagementAssessmentContext';

export default function ManagementAssessmentLayout() {
  return (
    <ManagementAssessmentProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ManagementAssessmentProvider>
  );
}
