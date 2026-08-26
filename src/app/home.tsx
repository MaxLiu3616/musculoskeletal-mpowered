import { useLocalSearchParams } from 'expo-router';

import HomeScreen from '@/features/home/components/HomeScreen';
import type {
  HomeAssessmentId,
  HomeAssessmentStatus,
} from '@/features/home/components/HomeScreen.data';

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
  const { name } = useLocalSearchParams<{
    name?: string | string[];
  }>();

  const userName = Array.isArray(name)
    ? name[0]
    : (name ?? '');

  return (
    <HomeScreen
      userName={userName}
      assessmentStatus={initialAssessmentStatus}
    />
  );
}