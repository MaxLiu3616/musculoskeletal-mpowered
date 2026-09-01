import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthImpactScreen from '@/features/social-health-assessment/components/SocialHealthImpactScreen';

export default function SocialHealthEnjoymentRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.relationshipImpact === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthImpactScreen
      area="enjoymentImpact"
      onBack={() => router.back()}
      onContinue={() =>
        router.push(
          '/assessment/social-health/general-mood',
        )
      }
      step={5}
    />
  );
}