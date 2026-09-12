import { Redirect, router } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { isValidAppointmentDate, selectedQuestions } from '@/features/care-planner/CarePlanner.data';
import AppointmentReviewScreen from '@/features/care-planner/components/AppointmentReviewScreen';

export default function AppointmentReviewRoute() {
  const { draft, saveDraft } = useCarePlanner();
  if (!isValidAppointmentDate(draft.appointmentDate)) return <Redirect href="/care-planner/appointment" />;
  if (!selectedQuestions(draft).length) return <Redirect href="/care-planner/questions" />;
  return <AppointmentReviewScreen plan={draft} onBack={() => router.dismissTo('/care-planner/questions')}
    onQuestions={() => router.dismissTo('/care-planner/questions')}
    onSave={() => { saveDraft(); router.dismissTo('/care-planner'); }} />;
}
