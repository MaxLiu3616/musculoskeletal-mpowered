import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import SexScreen from '@/features/onboarding/components/SexScreen';

export default function SexRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()} variant="sex">
      <SexScreen />
    </OnboardingScreen>
  );
}
