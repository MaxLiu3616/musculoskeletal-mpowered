import { Redirect, router } from 'expo-router';

import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import { useManagementAssessment } from '@/features/management-assessment/ManagementAssessmentContext';
import EmotionScreen from '@/features/management-assessment/components/EmotionScreen';

export default function EmotionRoute() {
  const { markAssessmentComplete } = useHomeAssessment();
  const { responses } = useManagementAssessment();

  if (!responses.exerciseFrequency) {
    return <Redirect href="/assessment/management/exercise" />;
  }

  const completeAssessment = () => {
    markAssessmentComplete('management');
    router.push('/assessment/management/summary');
  };

  return (
    <EmotionScreen
      onBack={() => router.back()}
      onContinue={completeAssessment}
    />
  );
}
