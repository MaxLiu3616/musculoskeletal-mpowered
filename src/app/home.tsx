import { router, useLocalSearchParams } from 'expo-router';

import HomeScreen from '@/features/home/components/HomeScreen';
import type {
  HomeAssessmentId,
  HomeAssessmentStatus,
} from '@/features/home/components/HomeScreen.data';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

const initialAssessmentStatus: Record<
  HomeAssessmentId,
  HomeAssessmentStatus
> = {
  pain: {
    completed: false,
  },
  movement: {
    completed: false,
  },
  'personal-care': {
    completed: false,
  },
  'social-health': {
    completed: false,
  },
  management: {
    completed: false,
  },
};

export default function HomeRoute() {
  const { name: routeNameParam } = useLocalSearchParams<{
    name?: string | string[];
  }>();
  const { name: onboardingName, setName } = useOnboarding();

  const routeName = Array.isArray(routeNameParam)
    ? routeNameParam[0]
    : (routeNameParam ?? '');
  const userName = routeName || onboardingName;

  const openAssessment = (assessmentId: HomeAssessmentId) => {
    if (assessmentId !== 'movement') {
      return;
    }

    if (userName) {
      setName(userName);
    }

    router.push('/assessment/movement');
  };

  return (
    <HomeScreen
      assessmentStatus={initialAssessmentStatus}
      onAssessmentPress={openAssessment}
      userName={userName}
    />
  );
}
