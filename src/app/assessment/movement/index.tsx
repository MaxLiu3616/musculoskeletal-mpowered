import { router } from 'expo-router';

import MovementStayActiveScreen from '@/features/movement-assessment/components/MovementStayActiveScreen';

export default function MovementStayActiveRoute() {
  const returnToPreviousScreen = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <MovementStayActiveScreen
      onBack={returnToPreviousScreen}
      onContinue={() => router.push('/assessment/movement/general')}
    />
  );
}
