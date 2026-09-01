import { router, useLocalSearchParams } from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import HomeScreen from '@/features/home/components/HomeScreen';
import type { HomeAssessmentId } from '@/features/home/components/HomeScreen.data';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

export default function HomeRoute() {
  const { name: routeNameParam } = useLocalSearchParams<{
    name?: string | string[];
  }>();

  const {
    name: onboardingName,
    setName,
  } = useOnboarding();

  const { assessmentStatus } =
    useHomeAssessment();

  const routeName = Array.isArray(
    routeNameParam,
  )
    ? routeNameParam[0]
    : (routeNameParam ?? '');

  const userName =
    routeName || onboardingName;

  const openAssessment = (
    assessmentId: HomeAssessmentId,
  ) => {
    if (userName) {
      setName(userName);
    }

    switch (assessmentId) {
      case 'pain':
        router.push('/assessment/pain');
        break;

      case 'movement':
        router.push(
          '/assessment/movement',
        );
        break;

      case 'social-health':
        router.push(
          '/assessment/social-health',
        );
        break;

      case 'personal-care':
      case 'management':
        break;
    }
  };

  return (
    <HomeScreen
      assessmentStatus={assessmentStatus}
      onAssessmentPress={
        openAssessment
      }
      userName={userName}
    />
  );
}