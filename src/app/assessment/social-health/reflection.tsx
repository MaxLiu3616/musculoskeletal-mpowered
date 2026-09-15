import {
  Redirect,
  router,
} from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthReflectionScreen from '@/features/social-health-assessment/components/SocialHealthReflectionScreen';

export default function SocialHealthReflectionRoute() {
  const { responses } =
    useSocialHealthAssessment();

  const {
    markAssessmentComplete,
  } = useHomeAssessment();

  if (
    responses.generalMood ===
    null
  ) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  const continueToSummary = () => {
    markAssessmentComplete(
      'social-health',
    );

    router.push(
      '/assessment/social-health/summary',
    );
  };

  return (
    <SocialHealthReflectionScreen
      onBack={() =>
        router.back()
      }
      onContinue={
        continueToSummary
      }
    />
  );
}