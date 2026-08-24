import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import OtherConditionsScreen from '@/features/onboarding/components/OtherConditionsScreen';

export default function OtherConditionsRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()}>
      <OtherConditionsScreen
        onContinue={() => router.push('/onboarding/login-information')}
      />
    </OnboardingScreen>
  );
}
