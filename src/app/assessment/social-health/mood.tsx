import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthImpactScreen from '@/features/social-health-assessment/components/SocialHealthImpactScreen';

export default function SocialHealthMoodImpactRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.travelling === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthImpactScreen
      area="moodImpact"
      onBack={() => router.back()}
      onContinue={() =>
        router.push(
          '/assessment/social-health/relationships',
        )
      }
      step={3}
    />
  );
}