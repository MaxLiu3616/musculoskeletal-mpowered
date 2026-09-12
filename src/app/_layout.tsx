import { Stack } from 'expo-router';

import { CarePlannerProvider } from '@/features/care-planner/CarePlannerContext';
import { HomeAssessmentProvider } from '@/features/home/HomeAssessmentContext';
import { MyHealthProvider } from '@/features/my-health/MyHealthContext';
import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';
import { ReflectionProvider } from '@/features/reflection/ReflectionContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <HomeAssessmentProvider>
        <ReflectionProvider>
          <MyHealthProvider>
            <CarePlannerProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </CarePlannerProvider>
          </MyHealthProvider>
        </ReflectionProvider>
      </HomeAssessmentProvider>
    </OnboardingProvider>
  );
}
