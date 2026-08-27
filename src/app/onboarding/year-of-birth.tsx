import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import YearOfBirthScreen from '@/features/onboarding/components/YearOfBirthScreen';

export default function YearOfBirthRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()}>
      <YearOfBirthScreen
        onContinue={() => router.push('/onboarding/health-conditions')}
      />
    </OnboardingScreen>
  );
}
