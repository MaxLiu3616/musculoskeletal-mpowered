import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import HealthProfileScreen from '@/features/my-health/components/HealthProfileScreen';

export default function HealthProfileRoute() {
  const { from } = useLocalSearchParams<{
    from?: string;
  }>();

  const handleBack = () => {
    if (from === 'home') {
      router.dismissTo('/home');
      return;
    }

    router.dismissTo('/my-health');
  };

  return (
    <HealthProfileScreen
      onBack={handleBack}
    />
  );
}