import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import VerificationCodeScreen from '@/features/onboarding/components/VerificationCodeScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

export default function VerificationCodeRoute() {
  const { authMode } = useOnboarding();

  const handleVerify = () => {
    if (authMode === 'signin') {
      router.replace('/home');
      return;
    }

    router.replace('/onboarding/loading');
  };

  return (
    <OnboardingScreen
      onBack={() => router.back()}
    >
      <VerificationCodeScreen
        onVerify={handleVerify}
      />
    </OnboardingScreen>
  );
}