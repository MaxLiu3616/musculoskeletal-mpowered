import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import RecordingConsentScreen from '@/features/care-planner/components/RecordingConsentScreen';

export default function RecordingConsentRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { plans, saveConsent } = useCarePlanner();
  const plan = plans.find((item) => item.id === id);
  if (!plan) return <Redirect href="/care-planner" />;
  const back = () => router.dismissTo({ pathname: '/care-planner/[id]', params: { id } });
  return <RecordingConsentScreen plan={plan} onBack={back} onSave={(paths) => { saveConsent(id, paths); back(); }} />;
}
