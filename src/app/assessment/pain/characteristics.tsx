import { Redirect, router } from 'expo-router';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainCharacteristicsScreen from '@/features/pain-tracker/components/PainCharacteristicsScreen';

export default function PainCharacteristicsRoute() {
  const { responses } = usePainAssessment();

  if (responses.locations.length === 0) {
    return <Redirect href="/assessment/pain" />;
  }

  return (
    <PainCharacteristicsScreen
      onBack={() => router.back()}
      onContinue={() => router.push('/assessment/pain/current')}
    />
  );
}
