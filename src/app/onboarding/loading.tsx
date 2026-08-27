import { router } from 'expo-router';

import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import LoadingBridgeScreen from '@/features/onboarding/components/LoadingBridgeScreen';

export default function LoadingBridgeRoute() {
  const { name } = useOnboarding();

  const continueToHome = () => {
    router.replace({
      pathname: '/home',
      params: { name },
    });
  };

  return <LoadingBridgeScreen onContinue={continueToHome} />;
}
