import { Redirect, router } from 'expo-router';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainIntensityScreen from '@/features/pain-tracker/components/PainIntensityScreen';

export default function AveragePainRoute() {
  const { markComplete, responses } = usePainAssessment();

  if (responses.worstPain === null) {
    return <Redirect href="/assessment/pain" />;
  }

  const completePainAssessment = () => {
    markComplete();
    router.push('/assessment/pain/summary');
  };

  return (
    <PainIntensityScreen
      onBack={() => router.back()}
      onContinue={completePainAssessment}
      questionId="average"
    />
  );
}
