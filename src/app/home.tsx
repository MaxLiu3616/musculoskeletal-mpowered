import { router, useLocalSearchParams } from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import HomeScreen from '@/features/home/components/HomeScreen';
import type { HomeAssessmentId } from '@/features/home/components/HomeScreen.data';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

export default function HomeRoute() {
  const { name: routeNameParam } = useLocalSearchParams<{
    name?: string | string[];
  }>();
  const { name: onboardingName, setName } = useOnboarding();
  const { assessmentStatus } = useHomeAssessment();

  const routeName = Array.isArray(routeNameParam)
    ? routeNameParam[0]
    : (routeNameParam ?? '');
  const userName = routeName || onboardingName;

  const openAssessment = (assessmentId: HomeAssessmentId) => {
    if (assessmentId !== 'pain' && assessmentId !== 'movement') {
      return;
    }

    if (userName) {
      setName(userName);
    }

    if (assessmentId === 'pain') {
      router.push('/assessment/pain');
      return;
    }

    router.push('/assessment/movement');
  };

  const openReflection = () => {
    router.push('/reflection');
  };

  return (
    <HomeScreen
      assessmentStatus={assessmentStatus}
      onAssessmentPress={openAssessment}
      onReflectionPress={openReflection}
      userName={userName}
    />
  );
}
