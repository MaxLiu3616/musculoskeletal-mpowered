import { router } from 'expo-router';

import PainLocationScreen from '@/features/pain-tracker/components/PainLocationScreen';

export default function PainLocationRoute() {
  const returnToPreviousScreen = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <PainLocationScreen
      onBack={returnToPreviousScreen}
      onContinue={() => router.push('/assessment/pain/characteristics')}
    />
  );
}
