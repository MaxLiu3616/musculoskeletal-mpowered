import { router } from 'expo-router';

import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';
import VerificationCodeScreen from '@/features/onboarding/components/VerificationCodeScreen';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';
import { supabase } from '@/services/supabase';
import { getUserProfile } from '@/services/userProfile';

export default function VerificationCodeRoute() {
  const {
    authMode,
    setAuthMode,
    setName,
    updateProfile,
  } = useOnboarding();

  const handleVerify = async () => {
    if (authMode === 'signin') {
      try {
        const profile =
          await getUserProfile();

        if (!profile) {
          await supabase.auth.signOut();

          setAuthMode('signup');

          router.replace('/');

          return;
        }

        setName(
          profile.name ?? '',
        );

        updateProfile({
          sex: profile.sex,
          yearOfBirth:
            profile.year_of_birth
              ?.toString() ?? '',
          diagnosis:
            profile.diagnosis,
          conditions:
            profile.conditions ?? [],
          otherConditions:
            profile.other_conditions ??
            '',
        });

        setAuthMode(null);

        router.replace('/home');

        return;
      } catch (error) {
        console.error(
          'Failed to load user profile:',
          error,
        );

        return;
      }
    }

    router.replace(
      '/onboarding/loading',
    );
  };

  const handleExistingAccount = () => {
    setAuthMode('signin');

    router.replace({
      pathname:
        '/onboarding/login-information/phone-number',
      params: {
        reason: 'existing-account',
      },
    });
  };

  return (
    <OnboardingScreen
      onBack={() => router.back()}
    >
      <VerificationCodeScreen
        onVerify={handleVerify}
        onExistingAccount={
          handleExistingAccount
        }
      />
    </OnboardingScreen>
  );
}