import { router } from 'expo-router';

import SplashScreen from '@/features/onboarding/components/SplashScreen';

import {
  useOnboarding,
} from '@/features/onboarding/OnboardingContext';

export default function SplashRoute() {
  const {
    setAuthMode,
  } = useOnboarding();

  const startSignup = () => {
    setAuthMode('signup');

    router.push(
      '/onboarding/name',
    );
  };

  const startSignin = () => {
    setAuthMode('signin');

    router.push(
      '/onboarding/login-information/phone-number',
    );
  };

  return (
    <SplashScreen
      onGetStarted={
        startSignup
      }
      onSignIn={
        startSignin
      }
    />
  );
}