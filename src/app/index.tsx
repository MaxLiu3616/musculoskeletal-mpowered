import { router } from 'expo-router';

import SplashScreen from '@/features/onboarding/components/SplashScreen';

export default function SplashRoute() {
  return (
    <SplashScreen
      onGetStarted={() => router.push('/onboarding/name')}
    />
  );
}
