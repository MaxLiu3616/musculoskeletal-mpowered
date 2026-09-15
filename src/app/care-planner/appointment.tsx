import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import AppointmentFormScreen from '@/features/care-planner/components/AppointmentFormScreen';

export default function AppointmentRoute() {
  const { from } =
    useLocalSearchParams<{
      from?: string;
    }>();

  const handleBack = () => {
    if (from === 'home') {
      router.dismissTo('/home');
      return;
    }

    if (from === 'my-health') {
      router.dismissTo('/my-health');
      return;
    }

    router.dismissTo(
      '/care-planner',
    );
  };

  return (
    <AppointmentFormScreen
      onBack={handleBack}
      onContinue={() =>
        router.push(
          '/care-planner/support',
        )
      }
    />
  );
}