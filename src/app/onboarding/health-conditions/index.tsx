import { router } from 'expo-router';

import HealthDiagnosisScreen from '@/features/onboarding/components/HealthDiagnosisScreen';
import OnboardingScreen from '@/features/onboarding/components/OnboardingScreen';

export default function HealthDiagnosisRoute() {
  return (
    <OnboardingScreen onBack={() => router.back()}>
      <HealthDiagnosisScreen
        onContinue={() => router.push('/onboarding/health-conditions/select')}
      />
    </OnboardingScreen>
  );
}
