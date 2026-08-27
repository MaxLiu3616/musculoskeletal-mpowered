import { router } from 'expo-router';

import HealthConditionSelectionScreen from '@/features/onboarding/components/HealthConditionSelectionScreen';
import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';

export default function HealthConditionSelectionRoute() {
  const continueToOtherConditions = () => {
    router.push('/onboarding/health-conditions/other');
  };

  return (
    <OnboardingScreen onBack={() => router.back()}>
      <HealthConditionSelectionScreen
        onContinue={continueToOtherConditions}
        onSkip={continueToOtherConditions}
      />
    </OnboardingScreen>
  );
}
