import { Redirect, router } from 'expo-router';

import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthStatementScreen from '@/features/social-health-assessment/components/SocialHealthStatementScreen';

export default function SocialHealthTravellingRoute() {
  const { responses } = useSocialHealthAssessment();

  if (responses.socialLife === null) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  return (
    <SocialHealthStatementScreen
      area="travelling"
      onBack={() => router.back()}
      onContinue={() =>
        router.push('/assessment/social-health/mood')
      }
      step={2}
    />
  );
}