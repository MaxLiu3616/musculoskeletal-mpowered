import {
  Redirect,
  router,
  useFocusEffect,
} from 'expo-router';
import { Linking } from 'react-native';
import { useCallback } from 'react';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { socialHealthSections } from '@/features/my-health/HealthRecord.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { useSocialHealthAssessment } from '@/features/social-health-assessment/SocialHealthAssessmentContext';
import SocialHealthSummaryScreen from '@/features/social-health-assessment/components/SocialHealthSummaryScreen';

const socialHealthEmotionTipsUrl =
  'https://muscha.org/relaxation/';

export default function SocialHealthSummaryRoute() {
  const { responses } =
    useSocialHealthAssessment();

  const { saveAssessment } =
    useMyHealth();

  const {
    cycleStart,
    cyclePeriodLabel,
  } = useHomeAssessment();

  const hasCompletedRequiredQuestions =
    responses.socialLife !== null &&
    responses.travelling !== null &&
    responses.moodImpact !== null &&
    responses.relationshipImpact !==
      null &&
    responses.enjoymentImpact !==
      null &&
    responses.generalMood !== null;

  useFocusEffect(
    useCallback(() => {
      if (
        hasCompletedRequiredQuestions &&
        cycleStart &&
        cyclePeriodLabel
      ) {
        saveAssessment(
          {
            type: 'social-health',
            sections:
              socialHealthSections(
                responses,
              ),
            periodLabel:
              cyclePeriodLabel,
          },
          cycleStart,
        );
      }
    }, [
      responses,
      hasCompletedRequiredQuestions,
      saveAssessment,
      cycleStart,
      cyclePeriodLabel,
    ]),
  );

  if (
    !hasCompletedRequiredQuestions
  ) {
    return (
      <Redirect href="/assessment/social-health" />
    );
  }

  const closeAssessment = () => {
    router.dismissTo('/home');
  };

  const exploreEmotionTips = () => {
    void Linking.openURL(
      socialHealthEmotionTipsUrl,
    );
  };

  return (
    <SocialHealthSummaryScreen
      periodLabel={
        cyclePeriodLabel ?? ''
      }
      onBack={() =>
        router.back()
      }
      onClose={
        closeAssessment
      }
      onExploreTips={
        exploreEmotionTips
      }
    />
  );
}