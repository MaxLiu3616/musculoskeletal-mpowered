import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import HealthTrackingScreen from '@/features/my-health/components/HealthTrackingScreen';

export default function HealthTrackingRoute() {
  const { tab, from } =
    useLocalSearchParams<{
      tab?: string;
      from?: string;
    }>();

  const initialTab =
    tab === 'history'
      ? 'History'
      : 'Chart';

  const handleBack = () => {
    if (from === 'home') {
      router.dismissTo('/home');
      return;
    }

    router.dismissTo('/my-health');
  };

  return (
    <HealthTrackingScreen
      initialTab={initialTab}
      onBack={handleBack}
      onRecord={(id) =>
        router.push({
          pathname:
            '/my-health/records/[id]',
          params: {
            id,
          },
        })
      }
      onAssessment={() =>
        router.push(
          '/assessment/pain',
        )
      }
    />
  );
}