import { router, useLocalSearchParams } from 'expo-router';

import GreetingScreen from '@/features/onboarding/components/GreetingScreen';
import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';

export default function GreetingRoute() {
  const { name } = useLocalSearchParams<{ name?: string | string[] }>();
  const submittedName = Array.isArray(name) ? name[0] : (name ?? '');

  return (
    <OnboardingScreen
      onBack={() => router.back()}
      variant="greeting"
    >
      <GreetingScreen
        name={submittedName}
        onContinue={() => router.push('/onboarding/sex')}
      />
    </OnboardingScreen>
  );
}
