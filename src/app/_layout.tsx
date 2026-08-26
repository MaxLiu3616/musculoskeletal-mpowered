import { Stack } from 'expo-router';

import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';
import { PainAssessmentProvider } from '@/features/pain-tracker/PainAssessmentContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <PainAssessmentProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PainAssessmentProvider>
    </OnboardingProvider>
  );
}
