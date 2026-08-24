import { router } from 'expo-router';

import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import NameScreen from '@/features/onboarding/components/NameScreen';

export default function NameRoute() {
  const { setName } = useOnboarding();

  const continueToGreeting = (name: string) => {
    setName(name);
    router.push({
      pathname: '/onboarding/greeting',
      params: { name },
    });
  };

  return (
    <NameScreen
      onBack={() => router.back()}
      onContinue={continueToGreeting}
    />
  );
}
