import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthMoodScreen from '@/features/social-health-assessment/components/SocialHealthMoodScreen';

export default function SocialHealthGeneralMoodRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.enjoymentImpact === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthMoodScreen
      onBack={() => router.back()}
      onContinue={() =>
        router.push(
          '/assessment/social-health/reflection',
        )
      }
    />
  );
}