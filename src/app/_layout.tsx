import { Stack } from 'expo-router';

import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { MyHealthProvider } from '@/features/my-health/MyHealthContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <HomeAssessmentProvider>
        <MyHealthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </MyHealthProvider>
      </HomeAssessmentProvider>
    </OnboardingProvider>
  );
}
