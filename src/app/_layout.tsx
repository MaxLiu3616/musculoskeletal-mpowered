import { Stack } from 'expo-router';

import { OnboardingProvider } from '@/features/onboarding/OnboardingContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </OnboardingProvider>
  );
}
