import { router } from 'expo-router';

import NameScreen from '@/features/onboarding/components/NameScreen';

export default function NameRoute() {
  return (
    <NameScreen
      onBack={() => router.back()}
      onContinue={(name) =>
        router.push({
          pathname: '/onboarding/greeting',
          params: { name },
        })
      }
    />
  );
}
