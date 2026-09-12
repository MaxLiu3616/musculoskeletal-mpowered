import { Redirect, router, useFocusEffect } from 'expo-router';
import { Linking } from 'react-native';
import { useCallback } from 'react';

import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { socialHealthSections } from '@/features/my-health/HealthRecord.data';
import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthSummaryScreen from '@/features/social-health-assessment/components/SocialHealthSummaryScreen';

const socialHealthEmotionTipsUrl =
  'https://muscha.org/relaxation/';

export default function SocialHealthSummaryRoute() {
  const { responses } =
    useSocialHealthAssessment();

  const { markAssessmentComplete } =
    useHomeAssessment();
  const { saveAssessment } = useMyHealth();

  const hasCompletedRequiredQuestions =
    responses.socialLife !== null &&
    responses.travelling !== null &&
    responses.moodImpact !== null &&
    responses.relationshipImpact !== null &&
    responses.enjoymentImpact !== null &&
    responses.generalMood !== null;

  useFocusEffect(useCallback(() => {
    if (hasCompletedRequiredQuestions) {
      saveAssessment({ type: 'social-health', sections: socialHealthSections(responses) });
    }
  }, [responses, hasCompletedRequiredQuestions, saveAssessment]));

  if (!hasCompletedRequiredQuestions) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  const closeAssessment = () => {
    markAssessmentComplete(
      'social-health',
    );

    router.dismissTo('/home');
  };

  const exploreEmotionTips = () => {
    void Linking.openURL(
      socialHealthEmotionTipsUrl,
    );
  };

  return (
    <SocialHealthSummaryScreen
      onBack={() => router.back()}
      onClose={closeAssessment}
      onExploreTips={
        exploreEmotionTips
      }
    />
  );
}
