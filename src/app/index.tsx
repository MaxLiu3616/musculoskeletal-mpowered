import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import SplashScreen from '@/features/onboarding/components/SplashScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { supabase } from '@/services/supabase';

export default function SplashRoute() {
  const { setAuthMode } = useOnboarding();

  const [checkingSession, setCheckingSession] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session) {
        router.replace('/home');
        return;
      }

      setCheckingSession(false);
    };

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const startSignup = () => {
    setAuthMode('signup');
    router.push('/onboarding/name');
  };

  const startSignin = () => {
    setAuthMode('signin');
    router.push(
      '/onboarding/login-information/phone-number',
    );
  };

  if (checkingSession) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <SplashScreen
      onGetStarted={startSignup}
      onSignIn={startSignin}
    />
  );
}