import { Stack } from 'expo-router';

import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';
import { ReflectionProvider } from '@/features/reflection/ReflectionContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <HomeAssessmentProvider>
        <ReflectionProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ReflectionProvider>
      </HomeAssessmentProvider>
    </OnboardingProvider>
  );
}
