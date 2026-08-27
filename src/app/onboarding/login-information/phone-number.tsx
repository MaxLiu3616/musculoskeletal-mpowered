import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import PhoneNumberScreen from '@/features/onboarding/components/PhoneNumberScreen';

export default function PhoneNumberRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()}>
      <PhoneNumberScreen
        onContinue={() =>
          router.push('/onboarding/login-information/verification')
        }
      />
    </OnboardingScreen>
  );
}
