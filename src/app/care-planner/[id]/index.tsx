import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import AppointmentReviewScreen from '@/features/care-planner/components/AppointmentReviewScreen';

export default function SavedAppointmentRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { plans } = useCarePlanner();
  const plan = plans.find((item) => item.id === id);
  if (!plan) return <Redirect href="/care-planner" />;
  return <AppointmentReviewScreen plan={plan} onBack={() => router.dismissTo('/care-planner')}
    onQuestions={() => router.push({ pathname: '/care-planner/[id]/questions', params: { id } })}
    onConsent={() => router.push({ pathname: '/care-planner/[id]/consent', params: { id } })} />;
}
