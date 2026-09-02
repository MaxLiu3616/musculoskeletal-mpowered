import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthReflectionScreen from '@/features/social-health-assessment/components/SocialHealthReflectionScreen';

export default function SocialHealthReflectionRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.generalMood === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthReflectionScreen
      onBack={() => router.back()}
      onContinue={() =>
        router.push('/assessment/social-health/summary')
      }
    />
  );
}