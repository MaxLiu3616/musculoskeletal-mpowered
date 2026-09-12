import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import AppointmentQuestionsScreen from '@/features/care-planner/components/AppointmentQuestionsScreen';

export default function ModifyAppointmentQuestionsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { plans, saveQuestions } = useCarePlanner();
  const plan = plans.find((item) => item.id === id);
  if (!plan) return <Redirect href="/care-planner" />;
  const back = () => router.dismissTo({ pathname: '/care-planner/[id]', params: { id } });
  return <AppointmentQuestionsScreen plan={plan} onBack={back} onSave={(ids) => { saveQuestions(id, ids); back(); }} />;
}
