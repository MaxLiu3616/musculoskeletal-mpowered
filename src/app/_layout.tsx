import { Stack } from 'expo-router';

import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <HomeAssessmentProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </HomeAssessmentProvider>
    </OnboardingProvider>
  );
}
