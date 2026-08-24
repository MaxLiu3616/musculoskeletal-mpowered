import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import VerificationCodeScreen from '@/features/onboarding/components/VerificationCodeScreen';

export default function VerificationCodeRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()}>
      <VerificationCodeScreen
        onVerify={() => router.push('/onboarding/loading')}
      />
    </OnboardingScreen>
  );
}
