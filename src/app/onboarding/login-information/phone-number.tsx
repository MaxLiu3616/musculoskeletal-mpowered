import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import PhoneNumberScreen from '@/features/onboarding/components/PhoneNumberScreen';

export default function PhoneNumberRoute() {
  const {
    reason,
  } = useLocalSearchParams<{
    reason?: string;
  }>();

  const initialError =
    reason === 'existing-account'
      ? 'Phone number already exists. Please sign in instead.'
      : null;

  return (
    <OnboardingScreen
      onBack={() => router.back()}
    >
      <PhoneNumberScreen
        initialError={initialError}
        onContinue={() =>
          router.push(
            '/onboarding/login-information/verification',
          )
        }
      />
    </OnboardingScreen>
  );
}