import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthImpactScreen from '@/features/social-health-assessment/components/SocialHealthImpactScreen';

export default function SocialHealthRelationshipsRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.moodImpact === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthImpactScreen
      area="relationshipImpact"
      onBack={() => router.back()}
      onContinue={() =>
        router.push('/assessment/social-health/enjoyment')
      }
      step={4}
    />
  );
}