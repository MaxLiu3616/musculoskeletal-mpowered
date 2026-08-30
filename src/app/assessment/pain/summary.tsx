import { Redirect, router } from 'expo-router';

import { usePainAssessment } from '@/features/pain-tracker/PainAssessmentContext';
import PainAssessmentSummaryScreen from '@/features/pain-tracker/components/PainAssessmentSummaryScreen';

export default function PainAssessmentSummaryRoute() {
  const { responses } = usePainAssessment();

  if (responses.averagePain === null) {
    return <Redirect href="/assessment/pain" />;
  }

  const closeAssessment = () => {
    router.dismissTo('/home');
  };

  return (
    <PainAssessmentSummaryScreen
      onBack={() => router.back()}
      onClose={closeAssessment}
    />
  );
}
