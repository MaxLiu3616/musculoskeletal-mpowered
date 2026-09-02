import { Stack } from 'expo-router';

import { SocialHealthAssessmentProvider } from '@/features/social-health-assessment/SocialHealthAssessmentContext';

export default function SocialHealthAssessmentLayout() {
  return (
    <SocialHealthAssessmentProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SocialHealthAssessmentProvider>
  );
}