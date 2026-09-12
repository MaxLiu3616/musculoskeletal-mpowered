import { Redirect, router } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { isValidAppointmentDate } from '@/features/care-planner/CarePlanner.data';
import AppointmentQuestionsScreen from '@/features/care-planner/components/AppointmentQuestionsScreen';

export default function AppointmentQuestionsRoute() {
  const { draft, updateDraft } = useCarePlanner();
  if (!isValidAppointmentDate(draft.appointmentDate)) return <Redirect href="/care-planner/appointment" />;
  return <AppointmentQuestionsScreen plan={draft} onBack={() => router.dismissTo('/care-planner/support')}
    onSave={(selectedIds) => { updateDraft({ selectedIds }); router.push('/care-planner/review'); }} />;
}
