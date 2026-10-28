import { Redirect, router } from 'expo-router';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { isValidAppointmentDate } from '@/features/care-planner/CarePlanner.data';
import SupportPeopleScreen from '@/features/care-planner/components/SupportPeopleScreen';
import { useSetting } from '@/features/setting/SettingContext';

export default function SupportPeopleRoute() {
  const { draft } = useCarePlanner();
  const { supportPeopleAccountId } = useSetting();
  if (!isValidAppointmentDate(draft.appointmentDate)) return <Redirect href="/care-planner/appointment" />;
  return <SupportPeopleScreen key={supportPeopleAccountId} onBack={() => router.dismissTo('/care-planner/appointment')} onContinue={() => router.push('/care-planner/questions')} />;
}
