import { router } from 'expo-router';

import SocialHealthStatementScreen from '@/features/social-health-assessment/components/SocialHealthStatementScreen';

export default function SocialHealthSocialLifeRoute() {
  const returnToPreviousScreen = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/home');
  };

  return (
    <SocialHealthStatementScreen
      area="socialLife"
      onBack={returnToPreviousScreen}
      onContinue={() =>
        router.push('/assessment/social-health/travelling')
      }
      step={1}
    />
  );
}