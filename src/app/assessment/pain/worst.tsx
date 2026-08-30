import { Redirect, router } from 'expo-router';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainIntensityScreen from '@/features/pain-tracker/components/PainIntensityScreen';

export default function WorstPainRoute() {
  const { responses } = usePainAssessment();

  if (responses.mildestPain === null) {
    return <Redirect href="/assessment/pain" />;
  }

  return (
    <PainIntensityScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/pain/average')}
      questionId="worst"
    />
  );
}
