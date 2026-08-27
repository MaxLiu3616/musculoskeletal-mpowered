import { router } from 'expo-router';

import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import LoginInformationIntroScreen from '@/features/onboarding/components/LoginInformationIntroScreen';
import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';

export default function LoginInformationIntroRoute() {
  const { name } = useOnboarding();

  return (
    <OnboardingScreen onBack={() => router.back()}>
      <LoginInformationIntroScreen
        name={name}
        onContinue={() =>
          router.push('/onboarding/login-information/phone-number')
        }
      />
    </OnboardingScreen>
  );
}
