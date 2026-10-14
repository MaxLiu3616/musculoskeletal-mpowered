import { router } from 'expo-router';

import LoadingBridgeScreen from '@/features/onboarding/components/LoadingBridgeScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { createUserProfile } from '@/services/userProfile';

export default function LoadingBridgeRoute() {
  const {
    name,
    profile,
  } = useOnboarding();

  const continueToHome = async () => {
    try {
      await createUserProfile({
        name,
        profile,
      });

      router.replace({
        pathname: '/home',
        params: {
          name,
        },
      });
    } catch (error) {
      console.error(
        'Failed to create user profile:',
        error,
      );
    }
  };

  return (
    <LoadingBridgeScreen
      onContinue={continueToHome}
    />
  );
}